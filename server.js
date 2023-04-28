const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE.replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log(con.connections);
    console.log(`DB connection successful!`);
})

// app.use((req, res, next) => {
//     res.send(`<h3>Hello From The Server!</h3>`);
// });
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// start server
const port = process.env.PORT;

app.listen(port, `127.0.0.1`, () => {
    console.log(`App is running on port ${port}....`);
});