import { Router } from "express";
import {
  login,
  registerUser,
  registerPres,
  getPrestamos,
  getPresUser,
  ganancias, 
  actualizarEsta
} from "../controller/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/registerPres", registerPres);
router.post("/getPrestamos", getPrestamos);
router.post("/getPresUser", getPresUser);
router.post("/ganancias", ganancias);

export default router;
