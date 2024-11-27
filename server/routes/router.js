const express = require('express');
const router = express.Router();
const Notes = require('../models/notesSchema');

// create notes
router.post('/add-notes', async(req, res) => {
    const { title } = req.body;

    try {
        const addNotes = new Notes({ title });

        const storeData = await addNotes.save();
        console.log(storeData);
        res.status(201).json(storeData)

    } catch(error) {
        console.log('error' + error.message);
    }
});

//get notes
router.get('/get-notes', async(req, res) => {
    try {
        const notesData = await Notes.find();
        res.status(201).json(notesData);
        console.log(notesData);
    } catch(error) {
        res.status(404).json(error);
    }
});

//delete notes
router.delete('/delete-notes/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Notes.findByIdAndDelete({_id:id});

        res.status(201).json(deletedNote);
    } catch (error) {
        res.status(404).json(error);
    }
});

// post userSignUpData API
router.post("/postUsers", async(req, res) => {
    const {name, dateofbirth, email, password} = req.body;

    if(!name || !dateofbirth || !email || !password) {
        res.status(422).json({error:"fill all the data"});
    };

    try{
        const preuser = await Users.findOne({email:email});

        if(preuser) {
            res.status(422).json({error:"this user already exists"})
        } else {
            const finalUser = new Users({
                name, dateofbirth, email, password
            });

            // password hashing process   

            const storeData = await finalUser.save();
            console.log(storeData);
            res.status(201).json(storeData);
        }

    } catch(error) {
        console.log("error" + error.message);
    }
});


//post userSignIn data API ( User SignIn)
router.post("/signIn", async(req, res) => {
    const { email, password } = req.body;

    if( !email || !password ){
        res.status(400).json({ error:"fill all the details" });
    }

    try {
        const userSignin = await Users.findOne({email:email});
        if(userSignin) {
           const isMatch = await bcrypt.compare(password, userSignin.password);
           if(!isMatch) {
              res.status(400).json({ error:"Invalid Credentials" });
            } else {
                //token generate
                const token = await userSignin.generateAuthToken();

                //cookie generate
                res.cookie("SmartNote", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });
                res.status(201).json({ userSignin });
            }

        } else {
            res.status(400).json({ error:"User Do Not Exist"});
        }
    } catch (error) {
        res.status(400).json({ error:"Invalid Credentials"});
    }
});

// get user is login or not
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validUser = await Users.findOne({ _id: req.userID });
        console.log(validUser + "User is Signed In");
        res.status(201).json(validUser);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});

//User SignOut
router.get("/sign-out", authenticate, async(req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currEle) => {
            return currEle.token !== req.token
        });

        res.clearCookie("SmartNote");

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User SignOut");
    } catch (error) {
        console.log("Error for User SignOut");
    }
});

module.exports = router;