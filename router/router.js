import { Router } from "express";
import {
  login,
  registerUser,
  registerPres,
  getPrestamos,
  getPresUser,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/registerPres", registerPres);
router.post("/getPrestamos", getPrestamos);
router.post("/getPresUser", getPresUser);

export default router;
