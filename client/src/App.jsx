import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Profile from "./views/profile/Profile";
import Settings from "./views/settings/Settings";
import Post from "./views/post/Post";
import MyJobs from "./views/myJobs/MyJobs";
import NotFound from "./views/notFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/myJobs" element={<MyJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
