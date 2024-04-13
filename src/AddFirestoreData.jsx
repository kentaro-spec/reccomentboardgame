import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import Login from "./Login";
import WriteForm from "./WriteForm";
import Logout from "./Logout";
import UserInfo from "./UserInfo";

function AddFirestoreData() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await checkAdminStatus(user.email); // ログインしているユーザーのメールアドレスを使用して管理者ステータスを確認
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // ユーザーの管理者ステータスを確認する関数
  const checkAdminStatus = async (email) => {
    const docRef = collection(db, "admin-users");
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === email) {
        setIsAdmin(true); // メールアドレスが存在する場合、isAdminステートをtrueに設定

        console.log(userData, "isAdmin");
      }
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <UserInfo user={user} />
          {isAdmin ? (
            <>
              <WriteForm />
              <Logout />
            </>
          ) : (
            <p>管理者のみがアクセスできます。</p>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default AddFirestoreData;
