import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home.page.jsx";
import {data as mainPageData} from './mock/main.mock.js'

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage data={mainPageData} />} />
      </Routes>
    </div>
  );
}

export default App;
