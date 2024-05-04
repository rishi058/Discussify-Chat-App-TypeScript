import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import AuthApi from "../api/auth_api";

const useLogin = () => {
	const [loginLoading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email : string, password : string) => {
		const success = handleInputErrors(email, password);
		if (!success) return;
		setLoading(true);

		const user = await new AuthApi().login(email, password);

		if(user){
			localStorage.setItem("chat-user", JSON.stringify(user));
			setAuthUser(user);				
		}
		setLoading(false);
	};

	return { loginLoading, login };
};

export default useLogin;

function handleInputErrors(email : string, password : string) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}
