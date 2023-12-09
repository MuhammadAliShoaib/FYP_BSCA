import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/signup/actor", async (req, res) => {
  const { name, address, role } = req.body;

  console.log({
    name,
    address,
    role,
  });

  try {
    const user = await db.User.findOne({ address: address });

    if (user !== null) {
      return res.status(422).json({ message: "User address already exists!" });
    }

    const userByName = await db.User.findOne({ name: name });

    if (userByName !== null) {
      return res.status(422).json({ message: "User name already exists!" });
    }

    await db.User.create({
      name: name,
      address: address,
      role: role,
    });

    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/login", async (req, res) => {
  const { address } = req.query;
  // console.log(address);
  try {
    const user = await db.User.findOne({ address: address });
    console.log(user);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User does not exist." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
