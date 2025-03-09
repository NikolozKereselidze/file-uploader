// filepath: /Users/nikusha/Desktop/file-uploader/src/controllers/folderController.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export async function createFolder(req: Request, res: Response) {
  const { name } = req.body;
  const userId = (req.user as { id: string }).id;
  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getFolders(req: Request, res: Response) {
  const userId = (req.user as { id: string }).id;
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
    });

    return folders;
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteFolder(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.folder.delete({
      where: {
        id,
      },
    });
    res.redirect("/");
  } catch (error) {}
}
