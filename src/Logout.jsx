import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // ログアウト成功時の処理
      console.log("ログアウトしました");
    } catch (error) {
      // エラーハンドリング
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <div>
      <h2>ログアウトしますか？</h2>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

export default Logout;
