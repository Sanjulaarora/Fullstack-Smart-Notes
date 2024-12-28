const express = require('express');
const router = express.Router();
const Notes = require('../models/notesSchema');
const Users = require('../models/usersSchema');
const bcrypt = require('bcryptjs');

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

//post users (sign-up)
router.post('/sign-up', async(req, res) => {
    const { name, dateofbirth, email, password } = req.body;

    if(!name || !dateofbirth || !email || !password) {
        res.status(422).json({error: "Please fill all the fields"});
    };

    try {
      const preUser = await Users.findOne({email:email});

      if(preUser) {
        res.status(422).json({error: "This user is already present"});
      } else {
        const addUser = new Users({
            name, dateofbirth, email, password
        });

        //password hashing process

        const newUser = await addUser.save();
        console.log(newUser);
        res.status(201).json({newUser});
      }
    } catch(error) {
      console.log("Error: " + error.message);
    }
});

//user login (sign in)
router.post('/sign-in', async(req, res) => {
    const { email, password } = req.body;

    if( !email || !password ) {
        res.status(400).json({error: "Please all the fields"});
    }

    try {
        const userSignin = await Users.findOne({email:email});
        if(userSignin) {
          const isMatch = await bcrypt.compare(password, userSignin.password);

          if(!isMatch){
            res.status(400).json({error: "Invalid Password."});
          } else {
            //token generate
            const token = await userSignin.generateAuthToken();

            //cookie generate
            res.cookie("Smartnotes", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            });
            res.status(201).json({userSignin});
            console.log("User Signed In");
          }
        } else {
            res.status(400).json({error: "User does not exist"});
        }
    } catch(error) {
      res.status(400).json({error: "Invalid Credentials."})
    }
});

module.exports = router;