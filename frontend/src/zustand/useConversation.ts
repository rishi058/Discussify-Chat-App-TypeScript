import { create } from "zustand";
import ConversationModel  from "../interfaces/ConversationModel";
import MessageModel from "../interfaces/MessageModel";

const useConversation = create<{
  selectedConversation: ConversationModel | null;
  setSelectedConversation: (selectedConversation: ConversationModel | null) => void;
  messages: MessageModel[];
  setMessages: (messages: MessageModel[]) => void;
}>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: ConversationModel | null) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: MessageModel[]) => set({ messages }),
}));

export default useConversation;
