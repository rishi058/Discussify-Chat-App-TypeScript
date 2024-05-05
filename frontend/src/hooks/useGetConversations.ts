import { useEffect, useState } from "react";
import UserApi from "../api/user_api";
import UserModel from "../interfaces/UserModel";

function useGetConversations() {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState<UserModel[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			const data = await new UserApi().getUser();
			if(data){
				setConversations(data);
			}
			setLoading(false);
		};

		getConversations();
	}, []);

	return { loading, conversations };
}

export default useGetConversations;
