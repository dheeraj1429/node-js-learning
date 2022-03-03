require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const databaseCon = require('./models/db');

// router files
const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');

// helper
const rootFolder = require('./util/rootFolder');

app.set('view engine', 'ejs');
app.use(express.static(path.join(rootFolder, 'public')));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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
