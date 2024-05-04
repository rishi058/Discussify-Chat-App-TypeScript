import { useSocketContext } from "../../context/SocketContext";
import UserModel from "../../interfaces/UserModel";
import useConversation from "../../zustand/useConversation";

interface ConversationProps {
	conversation: UserModel;
	lastIdx: boolean;
	emoji: string;
}

const Conversation = ({ conversation, lastIdx, emoji } : ConversationProps) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const gradient = "bg-gradient-to-r from-blue-300 to-blue-400";

	return (
		<>
			<div
				className={`border-2 border-sky-500 rounded-xl mb-2 flex gap-2 items-center hover:bg-blue-300 p-2 py-2 cursor-pointer
				${isSelected ? `${gradient}` : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-500'>{conversation.username}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;