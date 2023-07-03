import Enseignant, { EnseignantDoc } from "../models/enseignant.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';



export const creeEnseignant = async (req: Request, res: Response ) => {
    const data = req.body;

    const email = data.email;
    console.log('enseignant: ',data);

    try {
        const enseignant = await Enseignant.findOne({email});

        if (enseignant) {
            res.json({
                message: 'Cet ensignant exist'
            })
        }
        const newEnseignant = new Enseignant(data);
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        
        newEnseignant
        .save()
        .then(() => {
            res.status(201).json({
                message:"l'enseignant a été crée avec succée!" 
              })
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur: '+ error
        })
    }
}


export const getEnseignant = async (req: Request, res: Response) => {


    console.log("get Enseignant");
}