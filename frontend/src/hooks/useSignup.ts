import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import SignupData from "../interfaces/SignupData";
import AuthApi from "../api/auth_api";

const useSignup = () => {
	const [signupLoading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender } : SignupData) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);

		const user = await new AuthApi().signup({ fullName, username, password, confirmPassword, gender });
		if(user){
			localStorage.setItem("chat-user", JSON.stringify(user));
			setAuthUser(user);				
		}

		setLoading(false);
	};

	return { signupLoading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender } : SignupData) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
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
