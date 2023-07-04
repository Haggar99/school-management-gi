import Enseignant, { EnseignantDoc } from "../models/enseignant.model";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const creeEnseignant = async (req: Request, res: Response ) => {
    const data = req.body;

    const email = data.email;
    console.log('enseignant: ',data);

    try {
        // La fonction findOne() c'est une fonction qui nous
        // permet de filtrer et de retourner un seul objet s'il existe
        const enseignant = await Enseignant.findOne({email});

        if (enseignant) {
            res.json({
                message: 'Cet ensignant exist'
            })
        }
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        const newEnseignant = new Enseignant(data);
        console.log('newEnseignant: ',newEnseignant);

        // la fonction save() nous permet d'enregistrer un
        // ou plusieurs objet au niveau de la base de donnée.
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

export const loginEnseignant = async (req: Request, res: Response) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    const email: string = userData.email;  
    try {
        const enseignant: EnseignantDoc = await Enseignant.findOne({email});

        if (!enseignant) {
            res.status(404).json({
                message: "user not found!"
            })
        }
        const isMatch = await bcrypt.compare(userData.password, enseignant.password);

        if (!isMatch) {
            res.status(400).json({
                message: 'Mot de passe incorrect!'
            })
        }
        const token = jwt.sign({
            userId: enseignant._id,
            email: enseignant.email
        },
        "AZERT1234",
         {
          expiresIn: "1h"
        }
        )
        res.status(200).json({
            message: 'Connecté',
            token: token,
            enseignant
        })
    } catch (error) {
        res.status(500).json({
            message: 'Erreur: '+error
        })
    }
}

export const getEnseignants = async (req: Request, res: Response) => {

    try {
        const enseignants: EnseignantDoc[] = await Enseignant.find()

        res.status(201).json({
            enseignants
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'erreur: ' + error
        })
    }
}