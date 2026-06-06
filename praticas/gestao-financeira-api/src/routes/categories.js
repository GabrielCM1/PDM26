import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma.js";

const router = Router();

const categorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  displayName: z.string().min(1, "Nome de exibição é obrigatório"),
  icon: z.string().min(1, "Ícone é obrigatório"),
  background: z.string().min(1, "Cor é obrigatória"),
  isIncome: z.boolean().default(false),
  isDefault: z.boolean().optional(),
});

router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao listar categorias",
    });
  }
});

router.post("/", async (req, res) => {
  const result = categorySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: result.error.issues,
    });
  }

  try {
    const category = await prisma.category.create({
      data: result.data,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar categoria",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const result = categorySchema.partial().safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: result.error.issues,
    });
  }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: result.data,
    });

    res.json(category);
  } catch (error) {
    res.status(404).json({
      error: "Categoria não encontrada",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        error: "Categoria não encontrada",
      });
    }

    if (category.isDefault) {
      return res.status(400).json({
        error: "Categorias padrão não podem ser excluídas",
      });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Erro ao excluir categoria",
    });
  }
});

export default router;