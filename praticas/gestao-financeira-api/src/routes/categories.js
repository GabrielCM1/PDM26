import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";

const router = Router();

const categorySchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  icon: z.string().min(1),
  background: z.string().min(1),
  isIncome: z.boolean().default(false),
});

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });

  res.json(categories);
});

router.post("/", async (req, res) => {
  const data = categorySchema.parse(req.body);

  const category = await prisma.category.create({
    data,
  });

  res.status(201).json(category);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = categorySchema.partial().parse(req.body);

  const category = await prisma.category.update({
    where: { id },
    data,
  });

  res.json(category);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.category.delete({
    where: { id },
  });

  res.status(204).send();
});

export default router;