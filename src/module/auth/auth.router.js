import { Router } from "express";
import validation from "../../middleware/validation.js";
import * as validators from "./auth.validation.js";
import * as rc from './controller/auth.js';
const router = Router()

router.get('/signup', rc.signupGet)
router.post('/signup', validation(validators.signup, '/auth/signup'), rc.signupPost)
router.get('/login', rc.renderLogin)
router.post('/login', validation(validators.signin, '/auth/login'), rc.login)

export default router