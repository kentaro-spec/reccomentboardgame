function TimeSelectionForm({ onTimeSelectionChange }) {
  const handleTimeSelectionChange = (event) => {
    const value = event.target.value;
    onTimeSelectionChange(value); // 親コンポーネントに選択された時間を渡す
  };

  return (
    <div>
      <label htmlFor="timeSelection">時間：</label>
      <select id="timeSelection" onChange={handleTimeSelectionChange}>
        <option value="15">15分</option>
        <option value="30">30分</option>
        <option value="60">1時間</option>
        <option value="120">2時間</option>
      </select>
    </div>
  );
}

export default TimeSelectionForm;
