import mongoose from "mongoose";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin, {AdminDoc} from "../models/admin.model";




export const creeAdmin = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
        const admin: AdminDoc = await Admin.findOne({email: userData.email});
        if (!admin) {
            const hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            const newAdmin = new Admin(userData);
    
            await newAdmin.save();
            res.status(201).json({
                message: 'Administrateur a été crée avec succée!'
            })
        }
        res.json({
            message: 'Cet utilisateur existe deja!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error: '+ error
        })
    }
}


export const login = async (req: Request, res: Response) => {

    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(userData)
    try {
        const admin = await Admin.findOne({email: userData.email});
        if(admin) {
            const passwordIsValid = await bcrypt.compare(userData.password, admin.password);
            if (!passwordIsValid) {
                res.json({
                    message: 'Mot de passe incorrect!'
                })
            }else {
                const token = jwt.sign(
                    {
                        userId: admin._id,
                        email: admin.email
                    },
                    'AZERT1234',
                    {
                        expiresIn: '1h'
                    }
                );
                res.status(200).json({
                    message: 'Connecté',
                    token: token,
                    admin: admin
                })
            }
        }else {
        return res.status(404).json(
            {
                message: 'Cet utilisateur n\'existe pas'
            }
        )
        }
    } catch (error) {
        res.status(500).json({
            message: 'Une error: '+ error
        })
    }
}