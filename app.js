require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const validator = require('express-validator');

const app = express();

// Routes
const api = require('./routes/api/api');

app.set('case sensitive routing', true);

app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//mailer.mount(app, passport);
app.use(validator([]));
app.use(fileUpload());
app.use(validator({
    customValidators: {
        enum: (input, options) => options.includes(input)
    }
}));

app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.use((err, req, res, next) => {
    //define error handler.
    res.send('an error occured');
});


module.exports = app