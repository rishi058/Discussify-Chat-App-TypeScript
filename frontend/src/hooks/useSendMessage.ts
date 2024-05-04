import { useState } from "react";
import useConversation from "../zustand/useConversation";
import MessageApi from "../api/message_api";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message : string) => {
		setLoading(true);

		const data = await new MessageApi().sendMessage(selectedConversation?._id ?? "", message);

		if(data){
			setMessages([...messages, data]);
		}

		setLoading(false);
	};

	return { sendMessage, loading };
};
export default useSendMessage;
