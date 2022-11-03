import { Router } from "express";
import * as pc from "./controller/note.js";
import { auth } from "../../middleware/auth.js";
import { HME, myMulter, validationTypes } from "../../services/multer.js";
const router = Router();

router.get("/", auth(), pc.note);
router.post(
  "/",
  auth(),
  myMulter(validationTypes.image).single("image"),
  HME("/note"),
  pc.addnote
);
router.get('/:id/delete', auth(), pc.deletenote)
export default router;
