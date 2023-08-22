const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors");
app.use(cors());



const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoute');


const {connection} = require("./db")

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(8010,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 8010")
})
