import { Router } from "express";
import { prisma } from "../prisma.js";
import { authMiddleware, adminOnly } from "../utils/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const { q, category, skip = 0, take = 24 } = req.query;
  const where = {};
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }, { sku: { contains: q, mode: "insensitive" } }];
  if (category) where.category = category;
  const [items, count] = await Promise.all([
    prisma.product.findMany({ where, skip: Number(skip), take: Number(take), orderBy: { createdAt: "desc" } }),
    prisma.product.count({ where })
  ]);
  res.json({ items, count });
});

router.get("/:id", async (req, res) => {
  const prod = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!prod) return res.status(404).json({ error: "Not found" });
  res.json(prod);
});

router.post("/", authMiddleware, adminOnly, async (req, res) => {
  const { sku, title, description, price, images = [], category, stock = 0 } = req.body;
  const prod = await prisma.product.create({ data: { sku, title, description, price, images, category, stock } });
  res.json(prod);
});

router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { sku, title, description, price, images, category, stock } = req.body;
  const prod = await prisma.product.update({ where: { id }, data: { sku, title, description, price, images, category, stock } });
  res.json(prod);
});

router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
