import { useState, FormEvent } from "react";
import GenderCheckbox from "./GenderCheckBox";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";
import "./style.css";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  //---------------------------------------------------------------

  const { signupLoading, signup } = useSignup();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  };

  //--------------------------------------------------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginLoading, login } = useLogin();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  //--------------------------------------------------------------

  return (
    <div className="justify-center flex items-center h-[95vh]">
      <div className={`container ${isSignUp ? "active" : ""}`} id="container">
        <div className={`form-container ${isSignUp ? "sign-up" : "sign-in"}`}>
          {isSignUp ? (
            <form onSubmit={handleSignup}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Username"
                value={inputs.fullName}
                onChange={(e) => {
                  setInputs({ ...inputs, fullName: e.target.value });
                }}
              />
              <input type="email"
               placeholder="Email"
               value={inputs.username}
               onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
               />
              <input type="password"
               placeholder="Password"
               onChange={(e) => setInputs({ ...inputs, password: e.target.value, confirmPassword: e.target.value })}
               />
              <GenderCheckbox
                onCheckboxChange={handleCheckboxChange}
                selectedGender={inputs.gender}
              />
              {signupLoading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                <button>Sign Up</button>
              )}
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {loginLoading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                <button>Sign In</button>
              )}
            </form>
          )}
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>  Hello, Friend !</h1>
              <p>   Already have an account ? Sign In here.</p>
              <button onClick={toggleForm}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back !</h1>
              <p>Didn't have an account ? Sign Up here.</p>
              <button onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
