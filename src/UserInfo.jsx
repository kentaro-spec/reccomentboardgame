import React from "react";

function UserInfo({ user }) {
  return (
    <div>
      <h2>ユーザー情報</h2>
      <p>ユーザー名: {user.displayName}</p>
      {/* その他のユーザー情報を表示する場合はここに追加 */}
    </div>
  );
}

export default UserInfo;
