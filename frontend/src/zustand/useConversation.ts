import { create } from "zustand";
import UserModel from "../interfaces/UserModel";
import MessageModel from "../interfaces/MessageModel";

const useConversation = create<{
  selectedConversation: UserModel | null;

  setSelectedConversation: (
    selectedConversation: UserModel | null
  ) => void;

  messages: MessageModel[];

  setMessages: (messages: MessageModel[]) => void;

}>((set) => ({

  selectedConversation: null,

  setSelectedConversation: (selectedConversation: UserModel | null) =>  set({ selectedConversation }),
  messages: [],
  setMessages: (messages: MessageModel[]) => set({ messages }),
}));

export default useConversation;
