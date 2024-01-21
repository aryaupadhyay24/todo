const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");


// Route 1 : Get all notes using : GET "/api/note/fetchallnotes"  login required

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);   
    }catch(error){
        console.error(error.message);
        res.status(500).sent("Internal server error");
    }
})


// Route 2 : Post add a new note using  : Post "/api/note/addnote"  login required

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Description length must be atleast 5').isLength({ min: 5 })
],async (req,res)=>{

    try {
        const {title , description,tag} = req.body;

        // if there are error return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title,description,tag,user : req.user.id,
        })
    
        const savedNote = await note.save();
    
    
        res.json(savedNote);
        
    }catch(error){
        console.error(error.message);
        res.status(500).sent("Internal server error");
    }
   
})


// Route 3 : update an existing note using  : Put "/api/note/updatenote" login required

router.put('/updatenote/:id',fetchuser,[
],async (req,res)=>{

    const {title,description,tag} = req.body;
    try {
    //create a newNote object
    const newNote = {};
    if(title){ newNote.title = title};
    if(description){ newNote.description = description};
    if(tag){ newNote.tag = tag};

    //find note and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Note not found");}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true});
    res.json(note);
    } catch (error) {
    console.error(error.message);
    res.status(500).sent("Internal server error");
    }
    
})



// Route 4 : Delete an existing note using  : Delete "/api/note/deletenote"  login required

router.delete('/deletenote/:id',fetchuser,[
],async (req,res)=>{

    try {

    //find note and Delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Note not found");}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note});
    } catch (error) {
    console.error(error.message);
    res.status(500).sent("Internal server error");
    }
    
})


module.exports = router;