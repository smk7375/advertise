const express = require('express');
const cookieparser = require('cookie-parser');

const app = express();

const userRouter = require('./routers/userRouter');
const adRouter = require('./routers/adRouter');
const favRouter = require('./routers/favRouter');
app.use(express.json());
app.use(cookieparser());

app.use('/ad', adRouter);

app.use('/user' , userRouter);

app.use('/fav' , favRouter);

app.listen(3000 , ()=>{
    console.log('server is listening to port 3000')
});