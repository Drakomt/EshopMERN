import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import { ToastContainer } from "react-toastify";
import { SignUpPage } from "./Pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
