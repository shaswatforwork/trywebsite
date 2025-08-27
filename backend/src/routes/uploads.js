import { Router } from "express";
import { authMiddleware, adminOnly } from "../utils/auth.js";
import { getPresignedUploadUrl } from "../utils/s3.js";

const router = Router();

router.post("/presign", authMiddleware, adminOnly, async (req, res) => {
  const { contentType } = req.body;
  if (!contentType) return res.status(400).json({ error: "contentType required" });
  const result = await getPresignedUploadUrl(contentType);
  res.json(result);
});

export default router;
