import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import MessageApi from "../api/message_api";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			const res = await new MessageApi().getMessages(selectedConversation?._id ?? "");
			if(res){
				setMessages(res);
			}
			setLoading(false);
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
