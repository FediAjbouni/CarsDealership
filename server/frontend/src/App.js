import LoginPanel from "./components/Login/Login";
import RegisterPanel from "./components/Register/Register";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import { Routes, Route, Navigate } from "react-router-dom";
import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";

function App() {
  return (
    <Routes>
      {/* Home page as the main landing */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/postreview/:id" element={<PostReview />} />
      {/* Catch-all: redirect unknown URLs back to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
