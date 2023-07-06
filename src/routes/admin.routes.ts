import express from 'express';
import *as adminCtrl from '../controllers/admin.controller';

const adminRouter = express.Router();

adminRouter.post('/cree-admin', adminCtrl.creeAdmin);
adminRouter.post('/login', adminCtrl.login);


module.exports = adminRouter;