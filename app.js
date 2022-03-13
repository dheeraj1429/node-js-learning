require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const databaseCon = require('./models/db');
const ejs = require('ejs');
const multer = require('multer');
const session = require('express-session');
const mongodbStorage = require('connect-mongodb-session')(session);
const cart = require('./cart');

const KEY = process.env.SCRET_KEY;

// router files
const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');

const storage = new mongodbStorage({
    uri: cart.MongoDbUrl,
    collection: 'sessions',
});

// helper
const rootFolder = require('./util/rootFolder');

const imageUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            file.fieldname === 'image' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, './upload/images');
        } else {
            cb(null, './upload/videos');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: KEY,
        resave: false,
        saveUninitialized: false,
        store: storage,
    })
);
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.static(path.join(rootFolder, 'public')));
app.use(express.static(path.join(rootFolder, 'upload')));

app.use(express.json());
app.use(cookieParser());
app.use(multer({ storage: imageUpload }).single('file'));

// Router
app.use('/home', indexRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// database connection
databaseCon(() => {
    // server
    app.listen(port, () => {
        console.log('server started...');
    });
});
