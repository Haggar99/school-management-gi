import express = require('express');
import bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
import *as enseignantCtrl from './controllers/enseignant.controller';


const app = express();

const enseignantRouter = require('./routes/enseignant.routes');
const adminRouter = require('./routes/admin.routes');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use(
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', 1);
    next();
    }

);


app.use('/api/enseignant', enseignantRouter);
app.use('/api/admin', adminRouter);
export default app;

