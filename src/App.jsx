import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GameSelector from "./GameSelector";
import AddFirestoreData from "./AddFirestoreData";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSelector />} />
        <Route path="/add" element={<AddFirestoreData />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
