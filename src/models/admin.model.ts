import mongoose from "mongoose";
import { Sexe, Status } from "./enseignant.model";


export enum Post {
    Directeur = "Directeur"
}

export interface IAdmin {
    _id: string;
    nom: string;
    prenom: string;
    sexe: Sexe;
    post: Post;
    status: Status;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date
}

export type AdminDoc = mongoose.Document & IAdmin;


interface IAdminModel extends mongoose.Model<AdminDoc> {
    build(attr: IAdmin): AdminDoc
}


const adminSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String,
        require: true
    },
    sexe: {
        type: String
    },
    post: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Admin = mongoose.model<AdminDoc, IAdminModel>('Admin', adminSchema)

export default Admin;

