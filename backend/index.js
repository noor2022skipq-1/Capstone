const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const storyRouter = require('./routes/storyRouter');
const engagementRouter = require('./routes/engagementRouter');
const commentRouter = require('./routes/commentRouter');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/",userRouter);
app.use("/",storyRouter);
app.use("/",engagementRouter);
app.use("/",commentRouter);


app.listen(3000,()=>{
    console.log('server is listening')
})