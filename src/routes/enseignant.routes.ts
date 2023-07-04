import express from "express";
import *as enseignantCtrl from '../controllers/enseignant.controller';


const enseignantRouter = express.Router();

enseignantRouter.post('/new-enseignant', enseignantCtrl.creeEnseignant);
enseignantRouter.get('/',enseignantCtrl.getEnseignants);
enseignantRouter.post('/login-enseignant', enseignantCtrl.loginEnseignant);

module.exports = enseignantRouter;