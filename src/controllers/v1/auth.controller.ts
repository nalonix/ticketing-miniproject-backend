import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const signup: RequestHandler = async (req, res, next) => {

    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({email});
        console.log(userExists);
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // User doesn't exist so continue creating new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        console.log(newUser);

        res.status(201).json({ message: "User created successfully" });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
        return;
    }
}
 


export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Incorrect credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {expiresIn: "5h"});
        res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, role: user.role } });
        return;
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        return;
    }
}