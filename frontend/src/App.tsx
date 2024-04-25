import { Toaster } from "react-hot-toast";
import NavBar from "./components/navbar/NavBar";
import AuthPage from "./pages/auth/AuthPage";

function App() {
  return (
    <>
      <NavBar/>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-950">
        <AuthPage/>
      </div>
      <Toaster/>
    </>
  )
}

export default App