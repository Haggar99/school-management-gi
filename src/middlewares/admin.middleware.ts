import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const checkAuthAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = (req.headers.authorization as string);
        console.log(token);
        const user = jwt.verify(
            token,
            'AZERT1234'
        );
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Erreur d'authentification!"
        })
    }
}