import { Router } from "express";
import { prisma } from "../prisma.js";
import { hashPassword, comparePassword, signToken, authMiddleware } from "../utils/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, admin_code } = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email already registered" });
    const hashed = await hashPassword(password);
    const isAdmin = admin_code === "RUDRAVYA_ADMIN_2025";
    const user = await prisma.user.create({ data: { email, password: hashed, name, isAdmin } });
    const token = signToken(user);
    res.json({ token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, name: user.name } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin, name: user.name } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
