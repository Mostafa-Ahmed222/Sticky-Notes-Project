import multer from "multer";

export const validationTypes={
    image: ['image/png', 'image/jpeg', 'image/jif']
}

export const HME = (redirectPath)=>{
    return (err, req, res, next)=>{
        if (err) {
            req.flash('multerErr', err)
            res.redirect(redirectPath)
        } else {
            next()
        }
    }
}

export const myMulter = (customValidation = validationTypes.image)=>{

    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb)=>{
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('In-valid Format', false)
        }
    }
    const upload = multer({fileFilter, storage})
    return upload
}