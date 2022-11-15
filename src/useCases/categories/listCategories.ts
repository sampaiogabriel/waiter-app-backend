import { Request, Response } from "express";
import { Category } from "../../app/models/Category";

export async function listCategories(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({
      error: "Internal Server Error",
    });
  }
}
