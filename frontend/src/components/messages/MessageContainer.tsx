import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col w-full'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-blue-500/50 px-4 py-2 mb-2 rounded-t-2xl sm:rounded-tl-none'>
						<span className='label-text text-black'>To: </span>{" "}
						<span className='text-black font-semibold '>{selectedConversation.username}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
}

export default MessageContainer;

function NoChatSelected() {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<div className="label-text text-slate-600 font-bold text-xl ">Welcome 👋 {authUser?.username} ❄</div>
				<div className="label-text text-slate-600 font-bold text-lg">Select a chat to start messaging</div>
				<TiMessages className='text-3xl md:text-6xl text-center text-slate-600' />
			</div>
		</div>
	);
}