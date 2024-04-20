import jwt from "jsonwebtoken";
import { Response } from "express";

const generateTokenAndSetCookie = (userId : string, res : Response) => {

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ error: "JWT secret is not defined." });
    }

	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // ms [15 days]
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};

export default generateTokenAndSetCookie;
