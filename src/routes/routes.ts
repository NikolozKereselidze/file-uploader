const express = require("express");
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  {
    res.render("index");
  }
});

module.exports = router;
