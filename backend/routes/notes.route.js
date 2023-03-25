const express = require("express")

const notesRouter = express.Router()

const { NoteModel } = require("../models/Note.model")

notesRouter.get("/", async (req, res) => {
    const notes = await NoteModel.find()
    res.send(notes)
})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send({ "Msg": "Note created sucessfully" })
    } catch (error) {
        console.log(error)
        res.send({ "Error": "Something wrong" })
    }

})

notesRouter.patch("/update/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await NoteModel.findOne({ _id: noteID})
    if (userID !== note.userID) {
        res.send("Not Authorised")
    } else {
        const payload = req.body;
        const noteID = req.params.noteID
        await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.send({ "Message": "Note Updated Sucessfully" })
    }

})

notesRouter.delete("/delete/:noteID", async (req, res) => {

       const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await NoteModel.findOne({ _id: noteID})
    if (userID !== note.userID) {
        res.send("Not Authorised")
    }else{
        await NoteModel.findByIdAndDelete({ _id: noteID })
        res.send({ "Message": "Deleted sucessfully" })
    }
    
})

module.exports = { notesRouter }