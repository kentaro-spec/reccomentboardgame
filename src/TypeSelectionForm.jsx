import React from "react";

function TypeSelectionForm({ onTypeSelectionChange }) {
  const handleTypeSelectionChange = (event) => {
    const value = event.target.value;
    onTypeSelectionChange(value); // 親コンポーネントに選択されたタイプを渡す
  };

  return (
    <div>
      <label htmlFor="typeSelection">ジャンル</label>
      <select id="typeSelection" onChange={handleTypeSelectionChange}>
        <option value="わいわい">わいわい</option>
        <option value="じっくり">じっくり</option>
        <option value="すぐできる">すぐできる</option>
        <option value="協力">協力</option>
        <option value="心理戦">心理戦</option>
        <option value="ボード使いたい">ボード使いたい</option>
        <option value="サイコロ使いたい">サイコロ使いたい</option>
      </select>
    </div>
  );
}

export default TypeSelectionForm;
