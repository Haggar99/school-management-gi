import mongoose from "mongoose";


export enum Sexe {
    M = "M",
    F = "F"
}

export enum Status {
    True = "True",
    False = "False",
}

export interface IEnseignant {
    _id: string;
    nom: string;
    prenom: string;
    sexe: Sexe;
    age: number;
    email: string;
    password: string;
    status: Status;
    admin: string;
    createdAt: Date;
    updatedAt: Date
}

export type EnseignantDoc = mongoose.Document & IEnseignant;


interface IEnseignantModel extends mongoose.Model<EnseignantDoc> {
    build(attr: IEnseignant): EnseignantDoc
}

const enseignantSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    sexe: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: [Status.True, Status.False],
        require: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Admin'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Enseignant = mongoose.model<EnseignantDoc,IEnseignantModel>('Enseignant', enseignantSchema);

export default Enseignant;