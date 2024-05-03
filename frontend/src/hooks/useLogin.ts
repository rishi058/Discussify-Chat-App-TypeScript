import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import Api from "../api/api";

const useLogin = () => {
	const [loginLoading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext()||{};

	const login = async (email : string, password : string) => {
		const success = handleInputErrors(email, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await new Api().Api.post('/api/auth/login', {
                email : email,
                password : password
            });
			
			if (res.data.error) {
				throw new Error(res.data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			if (setAuthUser) {
				setAuthUser(data);
			}

		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
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
