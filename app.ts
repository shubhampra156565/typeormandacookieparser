import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/db";
import { Userrepo, Sessionrepo } from "./src/repo.ts/userreepo";
import { Register } from "./src/RegisterClasss/register";
import cookieParser from "cookie-parser";
// import { SessionStore } from "./src/entity/session";
// import { join } from "path";


const app = express();

app.use(express.json());

app.use(cookieParser('sdfghjfdsfghnbvcxvbnvcxzsdfghjnbvcxdshjfmncvbxvfagshdnxb'));



app.get('/', (req, res) => {
    res.send({ req })
});


app.post('/register', async (req, res) => {
    let { firstName, lastName, isActive, email } = req.body
    let user = await Userrepo.insert({
        firstName: firstName,
        lastName: lastName,
        isActive: isActive,
        email: email
    });
    res.status(200).send({ user });
});




app.post('/getuser', async (req, res) => {
    const { id } = req.body;
    const response = await Userrepo.findOne({ where: { id: id } })
    res.send(response?.id)
    res.send(response);
});


app.get('/homepage',async(req, res) => {
    // Read the signed cookie
    let session = req.signedCookies._smarttokenAuthid;
    console.log(session);

    if(session === undefined){
        return res.send(" Accesss denied you tempered the cookie")

    }
    let isSession = await Sessionrepo.findOne({where:{ session_id : session}})
        if(!isSession) { 
            res.send({"status":"failed","message":"you session is expired"})
        }
        else{ 
            res.send(`<h1> welcome to home page ${isSession.email} </h1>`)
        }

});

app.get("/log/:e", async (req, res) => {
    let email = req.params.e
    let instance = Register.getInstace();
    let user = await instance.main2(email)
    console.log(user)
    if (!user) {
        res.send({ "status": "failed", "message": " eamil not found " })
    }
    else {
        let id = user.id.toString();
        let number = Math.random().toString().substring(2);
        let unique_session_id = id + number;


        let session_info = await Sessionrepo.findOne({ where: { user_id: user.id } });
        if (!session_info) {
            await Sessionrepo.insert({
                user_id: user.id, email: user.email, session_id :unique_session_id
            })
        }
        else {
            session_info.session_id = unique_session_id
            await Sessionrepo.save(session_info);
        }
        res.cookie("_smarttokenAuthid", unique_session_id, { httpOnly: true, secure: false, signed: true, });
        res.send("logged in succcesfully" + " the iser is after this message \n" + JSON.stringify(user));
    }
});


app.post("/login", async (req, res) => {
    let { email } = req.body
    let instance = Register.getInstace();
    let user = await instance.main2(email)
    console.log(user)
    if (!user) {
        res.send({ "status": "failed", "message": " eamil not found " })
    }
    else {
        let id = user.id.toString();
        let number = Math.random().toString().substring(2);
        let unique_session_id = id + number;
        res.cookie("_smarttokenAuthid", unique_session_id, { httpOnly: true, secure: false, signed: true, });
        res.send("logged in succcesfully" + " the iser is after this message \n" + JSON.stringify(user));
    }
});


app.post('/isemail', async (req, res) => {
    let { email } = req.body
    let instance = Register.getInstace();
    let user = await instance.main2(email)
    let isemail = await instance.main(email);
    res.status(200).send({ user, isemail });
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(3000, () => {
            console.log('i am here')
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
