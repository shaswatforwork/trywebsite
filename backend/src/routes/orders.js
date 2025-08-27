import { Router } from "express";
import { prisma } from "../prisma.js";
import { authMiddleware } from "../utils/auth.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const { items, shipping } = req.body; // items: [{productId, qty}], shipping: {name, phone, address, city, state, pincode}
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "No items" });
  const products = await prisma.product.findMany({ where: { id: { in: items.map(i => i.productId) } } });
  const orderItems = items.map(i => {
    const p = products.find(pp => pp.id == i.productId);
    if (!p) throw new Error("Product not found: " + i.productId);
    return { productId: p.id, qty: i.qty, price: p.price };
  });
  const total = orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const order = await prisma.order.create({
    data: {
      userId: req.user?.id,
      total,
      shipping,
      items: { create: orderItems }
    },
    include: { items: true }
  });
  res.json(order);
});

router.get("/mine", authMiddleware, async (req, res) => {
  const orders = await prisma.order.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: "desc" } });
  res.json(orders);
});

export default router;
