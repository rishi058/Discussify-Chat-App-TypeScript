import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from "../models/user.model";
import generateTokenAndSetCookie from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, email , password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ $or: [{ email }, { username: username }] });

		if (user) {
			return res.status(400).json({ error: "Email or username already in use" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id.toString() , res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				email : newUser.email,
				username: newUser.username,
				gender: newUser.gender,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", (error as Error).message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id.toString(), res);

		res.status(200).json({
			_id: user._id,
			email: user.email,
			username: user.username,
			gender: user.gender,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", (error as Error).message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", (error as Error).message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
