import express from "express";
import *as enseignantCtrl from '../controllers/enseignant.controller';
import { checkAuthAdmin } from "../middlewares/admin.middleware";

const enseignantRouter = express.Router();

enseignantRouter.post('/new-enseignant', checkAuthAdmin, enseignantCtrl.creeEnseignant);
enseignantRouter.get('/',enseignantCtrl.getEnseignants);
enseignantRouter.post('/login-enseignant', enseignantCtrl.loginEnseignant);

module.exports = enseignantRouter;