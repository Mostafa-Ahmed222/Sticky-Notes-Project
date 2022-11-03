import noteModel from '../../../../DB/model/note.model.js';
import cloudinary from './../../../services/cloudinary.js';
export const note = async (req, res)=>{
    const notes = await noteModel.find({userId: req.session.user.id})
    // const oldinputs = req.flash('oldInputs')
    res.render('notes', { notes, oldInputs: []})
}
export const addnote = async (req, res) => {
    if (!req.file) {
        req.flash("messageErr", 'Image is required')
        res.redirect('/note')
    } else {
        const { noteBody} = req.body;
      const {secure_url} = await cloudinary.uploader.upload(req.file.path,{
        folder: 'user/notePic'
      })
      const note = await noteModel.create({
        noteBody,
        createdBy: req.session.user.id,
        Picture: secure_url
      });
      res.redirect('/note')
    }
  
};
export const deletenote = async(req, res)=>{
    const {id} = req.params
    await noteModel.deleteOne({_id : id, userId : req.session.user.id})
    res.redirect('/note')
}