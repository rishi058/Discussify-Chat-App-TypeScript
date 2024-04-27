import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/navbar/NavBar";
import AuthPage from "./pages/auth/AuthPage";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";

function App() {
  const { authUser } = useAuthContext()||{};

  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-950">
      <Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/'/> : <AuthPage />} />
			</Routes>
      </div>
      <Toaster/>
    </>
  )
}

export default App