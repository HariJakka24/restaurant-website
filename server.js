const exp = require("express")
const app = exp()
require("dotenv").config()
const userApp = require("./API/userApi");
const itemsApp = require("./API/itemsApi");
const cors = require("cors");

const mongoose = require("mongoose")

const path = require("path");

//connect express server with React
app.use(exp.static(path.join(__dirname, './build')))

//connect
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected"))
    .catch(err => {
        console.log("Err is db connect ", err);
    })

    
app.use("/user", userApp)
app.use("/item", itemsApp)
app.use(cors());







const PORT = process.env.PORT
app.listen(PORT, () => console.log(`web server listening on ${PORT}`))
