import MessageModel from './MessageModel';

export default interface ConversationModel {
	_id: string;
	username: string;
	profilePic: string;
	participants: string[];
	messages: MessageModel[];
}