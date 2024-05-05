import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AuthApi from "../api/auth_api";

function useLogout(){
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		const success = await new AuthApi().logout();
		if(success){
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		}
		setLoading(false);	
	};

	return { loading, logout };
}

export default useLogout;
