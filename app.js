const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const rootFolder = path.join(path.dirname(process.mainModule.filename));

app.set('view engine', 'ejs');
app.set(express.static(path.join(rootFolder, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
   res.render('home');
});

app.listen(port, () => {
   console.log('searver start');
});
