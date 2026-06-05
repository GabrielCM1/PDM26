import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";

const router = Router();

const transactionSchema = z.object({
  description: z.string().min(1),
  value: z.coerce.number(),
  date: z.string(),
  categoryId: z.coerce.number(),
});

router.get("/", async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  res.json(transactions);
});

router.post("/", async (req, res) => {
  const data = transactionSchema.parse(req.body);

  const transaction = await prisma.transaction.create({
    data: {
      description: data.description,
      value: data.value,
      date: new Date(data.date),
      categoryId: data.categoryId,
    },
    include: {
      category: true,
    },
  });

  res.status(201).json(transaction);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = transactionSchema.partial().parse(req.body);

  const transaction = await prisma.transaction.update({
    where: { id },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    },
    include: {
      category: true,
    },
  });

  res.json(transaction);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.transaction.delete({
    where: { id },
  });

  res.status(204).send();
});

export default router;