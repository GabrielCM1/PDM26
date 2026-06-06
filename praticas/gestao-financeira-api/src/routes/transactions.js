import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";

const router = Router();

const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  value: z.coerce.number().positive("Valor deve ser maior que zero"),
  date: z.string().min(1, "Data é obrigatória"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

router.get("/", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao listar transações",
    });
  }
});

router.post("/", async (req, res) => {
  const result = transactionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: result.error.issues,
    });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        description: result.data.description,
        value: result.data.value,
        date: new Date(result.data.date),
        categoryId: result.data.categoryId,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar transação",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const result = transactionSchema.partial().safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: result.error.issues,
    });
  }

  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...result.data,
        date: result.data.date ? new Date(result.data.date) : undefined,
      },
      include: {
        category: true,
      },
    });

    res.json(transaction);
  } catch (error) {
    res.status(404).json({
      error: "Transação não encontrada",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.transaction.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      error: "Transação não encontrada",
    });
  }
});

export default router;