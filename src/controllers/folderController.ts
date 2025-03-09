// filepath: /Users/nikusha/Desktop/file-uploader/src/controllers/folderController.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function createFolder(req: Request, res: Response) {
  const { name, path } = req.body;
  const userId = (req.user as { id: string }).id;
  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        path,
        userId,
      },
    });
    res.status(201).json(folder);
  } catch (error) {
    res.status(400).json({ error });
  }
}
