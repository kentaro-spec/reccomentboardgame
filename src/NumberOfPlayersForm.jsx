
function NumberOfPlayersForm({ onNumberOfPlayersChange }) {
  const handleNumberOfPlayersChange = (event) => {
    const value = event.target.value;
    onNumberOfPlayersChange(value); // 親コンポーネントに選択された人数を渡す
  };

  return (
    <div>
      <label htmlFor="numberOfPlayers">人数：</label>
      <select id="numberOfPlayers" onChange={handleNumberOfPlayersChange}>
        <option value="2">2人</option>
        <option value="3">3人</option>
        <option value="4">4人</option>
        <option value="5">5人</option>
        <option value="6">6人</option>
        <option value="7">7人</option>
        <option value="8">8人</option>
        <option value="9">9人</option>
        <option value="10">10人</option>
      </select>
    </div>
  );
}

export default NumberOfPlayersForm;
