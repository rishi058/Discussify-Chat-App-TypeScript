import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import SignupData from "../interfaces/SignupData";
import AuthApi from "../api/auth_api";

const useSignup = () => {
	const [signupLoading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({username, email, password, confirmPassword, gender } : SignupData) => {
		const success = handleInputErrors({username, email, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);

		const user = await new AuthApi().signup({username, email, password, confirmPassword, gender });
		if(user){
			localStorage.setItem("chat-user", JSON.stringify(user));
			setAuthUser(user);				
		}

		setLoading(false);
	};

	return { signupLoading, signup };
};

export default useSignup;

function handleInputErrors({username, email, password, confirmPassword, gender } : SignupData) {
	if (!email || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
