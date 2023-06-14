const express = require('express');
const router = express.Router();
var fetchuser = require("../middlware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

//Route 1: Get All the notes using: GET "/api/notes/getuser", Login required

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)        
    } catch (error) {
        console.log(error.message)
        res.json(500).send("internal server Error!")
      } 
})


//Route 2: Add a new notes using: POST "/api/notes/addnote ", Login required

router.post('/addnote', fetchuser,
[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res)=>{
    try {
        // If there are errors, return Bad request and errors 
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       
        const note = new Note({
           title, description, tag , user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.json(500).send("internal server Error!")
      } 

})

//Route 3: Update an existing notes using: PUT "/api/notes/updatenote ", Login required


router.put('/updatenote/:id', fetchuser, async (req, res)=>{
  const { title, description,  tag  } = req.body
  try {        
      // Create a new note object
      const newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};
      
      // Find the note to be updated to update it 
      let note = await Note.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}
      
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
      }
      
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({note});
  }catch (error) {
    console.log(error.message)
    res.json(500).send("internal server Error!")
  } 
});

//Route 4: DElete notes using: DELETE "/api/notes/deletenote ", Login required

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
  const { title, description,  tag  } = req.body
  try {
    // Find the note to be Delete and Delete  it 
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}
    
    // Allow Deletion only if user own this notes
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
    }
    
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note: note});
  } catch (error) {
        console.log(error.message)
        res.json(500).send("internal server Error!")
   } 
});


module.exports = router 