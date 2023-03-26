const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const cors = require("cors")

const { connection } = require("./config/db")
const { UserModel } = require("./models/User.model")
const { notesRouter } = require("./routes/notes.route")
const { authenticate } = require("./middleware/authentication")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const userPresent = await UserModel.findOne({email})
    if (userPresent?.email) {
        res.send({ "Message": "Alredy Registered try to login" })
    }else{
        try {
            bcrypt.hash(password, 5, async function (err, hash) {
                // Store hash in your password DB.
                const user = new UserModel({ email, password: hash })
                await user.save()
                res.send({ "Message": "Signup sucessfully" })
            });
    
        } catch (error) {
            console.log(error)
            res.send({ "Message": "Something went wrong,try again later" })
        }
    }
   
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        // console.log(user)
        if (user.length > 0) {
            const hashed_password = user[0].password
            bcrypt.compare(password, hashed_password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ "userID":user[0]._id }, 'hush');
                    res.send({ "Message": "Login Sucessfull", "token": token })
                } else {
                    res.send({ "Message": "Login Failed" })
                }
            });

        } else {
            res.send("Login Failed")
        }
    } catch (error) {
        console.log(error)
        res.send({ "Message": "Something went wrong,try again later" })
    }
})


app.get("/about", (req, res) => {
    res.send("About us data...")
})
app.use(authenticate)
app.use("/notes", notesRouter)

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to DB Sucessfully')
        console.log(process.env.name)
    } catch (error) {
        console.log("Error connecting to DB")
        console.log(error)
    }
    console.log("Listening on PORT 8080")
})