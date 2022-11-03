import userModel from "../../../../DB/model/user.model.js";
import cloudinary from "./../../../services/cloudinary.js";

export const renderProfile = async (req, res) => {
  const user = await userModel.findOne({ _id: req.session.user.id });
  const multerErr = req.flash("multerErr")[0];
  const image = req.flash("image")[0];
  res.render("profile", { user, multerErr });
};
export const addProfilePic = async (req, res) => {
  if (!req.file) {
    req.flash("image", "image required");
    res.redirect("/user/profile");
  } else {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "user/profile/profilePic",
    });
    const user = await userModel.updateOne(
      { _id: req.session.user.id },
      { profilePic: secure_url }
    );
    res.redirect("/user/profile");
  }
};
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  await userModel.deleteOne({ _id: req.session.user.id });
  req.flash("messageErr", "In-Valid session information please login");
  res.redirect("/auth/login");
};
export const renderUpdate = (req, res)=>{
  // const validationErr = req.flash('validationErr')
  const oldInputs = req.flash('oldInputs')[0]
  res.render('updateProfile', {oldInputs})
}
export const updateProfile = async (req, res) => {
  const { userName, phone } = req.body;
  const savedUser = await userModel.updateOne({_id: req.session.user.id},{
    userName,
    phone,
  });
  res.redirect("/user/profile");

};
