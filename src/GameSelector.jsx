import { useState } from "react";
import NumberOfPlayersForm from "./NumberOfPlayersForm";
import TimeSelectionForm from "./TimeSelectionForm";
import TypeSelectionForm from "./TypeSelectionForm";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // firebaseからdbをインポート
import "./App.css";

function GameSelector() {
  const [numberOfPlayers, setNumberOfPlayers] = useState("2");
  const [selectedTime, setSelectedTime] = useState("15");
  const [selectedType, setSelectedType] = useState("ワイワイ");
  const [selectedGameData, setSelectedGameData] = useState(null);

  const handleNumberOfPlayersChange = (value) => {
    setNumberOfPlayers(value);
  };

  const handleTimeSelectionChange = (value) => {
    setSelectedTime(value);
  };

  const handleTypeSelectionChange = (value) => {
    setSelectedType(value);
  };

  const getGames = async (numberOfPlayers, playTime, type) => {
    const gamesCollectionRef = collection(db, "gamesCollection");
    console.log(numberOfPlayers, playTime, type);
    const q = query(
      gamesCollectionRef,
      where("numberOfPlayers", "==", parseInt(numberOfPlayers)),
      where("playTime", "==", parseInt(playTime)),
      where("type", "==", type)
    );

    const querySnapshot = await getDocs(q);
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() });
    });

    // ドキュメントの数が3未満の場合はそのまま返す
    if (games.length <= 3) {
      console.log("取得したゲームデータ:", games); // データをコンソールに出力
      return games;
    }

    // ドキュメントの数が3より多い場合はランダムに3つ選んで返す
    const selectedGames = [];
    while (selectedGames.length < 3) {
      const randomIndex = Math.floor(Math.random() * games.length);
      selectedGames.push(games[randomIndex]);
      games.splice(randomIndex, 1);
    }
    console.log("取得したゲームデータ:", selectedGames); // データをコンソールに出力

    return selectedGames;
  };

  const fetchData = async () => {
    // 選択された条件を使ってデータを取得
    const selectedGames = await getGames(
      numberOfPlayers,
      selectedTime,
      selectedType
    );
    setSelectedGameData(selectedGames);
  };

  const handleFetchData = () => {
    fetchData();
  };

  // numberOfPlayersの値をconsole.logで出力
  console.log("typeの値:", selectedType);
  console.log("numberOfPlayersの値:", numberOfPlayers);
  console.log("selectedTimeの値:", selectedTime);

  return (
    <div className="GameSelector">
      <h2>ゲーム選択</h2>
      <NumberOfPlayersForm
        onNumberOfPlayersChange={handleNumberOfPlayersChange}
      />
      <TimeSelectionForm onTimeSelectionChange={handleTimeSelectionChange} />
      <TypeSelectionForm onTypeSelectionChange={handleTypeSelectionChange} />
      <button onClick={handleFetchData}>データを取得</button>
      {selectedGameData && (
        <div>
          <p>選択されたゲームデータ：</p>
          <ul>
            {selectedGameData.map((game) => (
              <li key={game.id}>{game.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameSelector;
