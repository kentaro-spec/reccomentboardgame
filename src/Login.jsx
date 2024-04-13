import React, { useEffect } from "react";
import { signInWithRedirect, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // useNavigateフックを使用してナビゲーションを取得

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(); // ログインするための auth インスタンスを取得
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Googleログインエラー:", error);
    }
  };

  // コンポーネントがマウントされた時にログイン状態を確認し、ログイン済みの場合は /add にリダイレクト
  useEffect(() => {
    const auth = getAuth(); // 現在の auth インスタンスを取得

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        navigate("/add");
      }
    });

    console.log(auth.currentUser);
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h2>ログインしてください</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
}

export default Login;
