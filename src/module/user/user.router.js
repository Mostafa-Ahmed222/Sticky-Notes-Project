import { Router } from "express";
import * as uc from "./controller/user.js";
import { auth } from "./../../middleware/auth.js";
import { HME, myMulter, validationTypes } from "../../services/multer.js";

const router = Router();

router.get("/profile", auth(), uc.renderProfile);
router.post(
  "/profile/pic",
  auth(),
  myMulter(validationTypes.image).single("image"),
  HME("/user/profile"), uc.addProfilePic
);
router.get('/profile/delete', auth(), uc.deleteAccount)
router.get('/profile/update', auth(), uc.renderUpdate)
router.post('/profile/update', auth(), uc.updateProfile)
export default router;
