import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import User from "../models/user.model";

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		
		const id = (decoded as { userId: string }).userId;  // or you can parse it into JSON

		const user = await User.findById(id).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.userId = user._id.toString();

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", (error as Error).message);
		res.status(500).json({ error: "Internal server error" });
	}
};




export default protectRoute;
