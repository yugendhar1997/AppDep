import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TopNavigation from "./components/TopNavigation";
import Tasks from "./components/Tasks";
import Messages from "./components/Messages";
import Leaves from "./components/Leaves";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/topNavigation" element={<TopNavigation />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/leaves" element={<Leaves />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
