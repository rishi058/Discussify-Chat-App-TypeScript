import { Request, Response } from "express";
import User from "../models/user.model";


export const getUsersForSidebar = async (req : Request, res : Response) => {
	try {
		const loggedInUserId = req.userId;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", (error as Error).message);
		res.status(500).json({ error: "Internal server error" });
	}
};
