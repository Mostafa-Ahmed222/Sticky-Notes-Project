import userModel from '../../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';

export const signupGet = (req, res) => {
  const messageErr = req.flash('messageErr')[0]
  const oldInputs = req.flash('oldInputs')[0]
  const validationErr = req.flash('validationErr')
  res.render("signup", {messageErr, oldInputs, validationErr});
};
export const signupPost = async (req, res) => {
  const { userName, email, password, phone } = req.body;
  const user = await userModel.findOne({ email }).select('email');
  if (user) {
    req.flash('messageErr', 'Email Exist')
    req.flash('oldInputs', req.body)
    res.redirect('/auth/signup')
  } else {
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
    const savedUser = await userModel.create({userName, email, phone, password: hashPassword})
    res.redirect('/auth/login')
  }
};
export const renderLogin = async(req, res)=>{
  const messageErr = req.flash('messageErr')[0]
  const oldInputs = req.flash('oldInputs')[0]
  const validationErr = req.flash('validationErr')
  res.render('login', {messageErr, oldInputs, validationErr})
}

export const login = async(req, res)=>{
  const {email, password} = req.body
  const user = await userModel.findOne({email})
  if (!user) {
    req.flash('messageErr', 'In-Valid Account')
    req.flash('oldInputs', req.body)
    res.redirect('/auth/login')
  } else {
    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
      req.flash('messageErr', 'In-Valid Account password')
    req.flash('oldInputs', req.body)
    res.redirect('/auth/login')
    } else {
      req.session.user = {
        id : user._id,
        isLoggedIn : true
      }
      res.redirect('/user/profile')
    }
  }
}