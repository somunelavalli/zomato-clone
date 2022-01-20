import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:type" exact element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
