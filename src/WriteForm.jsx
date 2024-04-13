import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore インスタンスをインポート

function WriteForm() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [playTime, setPlayTime] = useState(15);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("わいわい");

  const handleNumberOfPlayersChange = (event) => {
    setNumberOfPlayers(event.target.value);
  };

  const handlePlayTimeChange = (event) => {
    setPlayTime(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信動作を停止

    try {
      // Firestore にデータを書き込む
      const docRef = await addDoc(collection(db, "gamesCollection"), {
        numberOfPlayers: parseInt(numberOfPlayers),
        playTime: parseInt(playTime),
        title,
        type,
      });
      console.log("Document written with ID: ", docRef.id);

      // 書き込み後、フォームをリセット
      setNumberOfPlayers("");
      setPlayTime("");
      setTitle("");
      setType("わいわい");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="numberOfPlayers">Number of Players:</label>
        <select
          id="numberOfPlayers"
          value={numberOfPlayers}
          onChange={handleNumberOfPlayersChange}
          required
        >
          {[...Array(9).keys()].map((num) => (
            <option key={num + 2} value={num + 2}>
              {num + 2} 人
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="playTime">Play Time (minutes):</label>
        <select
          id="playTime"
          value={playTime}
          onChange={handlePlayTimeChange}
          required
        >
          <option value="15">15 分</option>
          <option value="30">30 分</option>
          <option value="60">1 時間</option>
        </select>
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={handleTypeChange} required>
          <option value="わいわい">わいわい</option>
          <option value="じっくり">じっくり</option>
          <option value="すぐできる">すぐできる</option>
          <option value="協力">協力</option>
          <option value="心理戦">心理戦</option>
          <option value="ボード使いたい">ボード使いたい</option>
          <option value="サイコロ使いたい">サイコロ使いたい</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WriteForm;
