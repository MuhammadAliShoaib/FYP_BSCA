import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/signup/user", async (req, res) => {
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

router.post("/login", async (req, res) => {
  // const { address } = req.body;
  // console.log(req.body)
  // console.log(address);
  try {
    const user = await db.User.findOne({ address: req.body.address });
    // console.log(user);

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

router.post("/addproduct", async (req, res) => {
  const { name, symbol, formula, manufacturer } = req.body;
  try {
    const product = await db.Product.findOne({ name: req.body.name });
    if (product) {
      res.status(401).json({ message: "Product Already Exists" });
    } else {
      await db.Product.create({
        name,
        symbol,
        formula,
        manufacturer,
      });
      res.status(200).json({ message: "Product Added" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get(`/manufacturer/meds`, async (req, res) => {
  try {
    const meds = await db.Product.find({ address: req.query.address });
    console.log(meds);
    if (meds.length > 0) {
      res.status(200).json(meds);
    } else {
      res.status(404).json({ message: "Medicines by manufacturer not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/createbatch", async (req, res) => {
  const { batchId, medicine, quantity, mfg, exp, manufacturer } = req.body;
  try {
    console.log(batchId);
    console.log(medicine);
    console.log(mfg);

    const batch = await db.Batch.findOne({ batchId: req.body.batchId });
    if (batch) {
      res.status(401).json({ message: "Batch was being duplicated" });
    } else {
      await db.Batch.create({
        batchId,
        medicine,
        totalSupply: quantity,
        quantity,
        mfg,
        exp,
        manufacturer,
      });
      res.status(200).json({ message: "Batch Created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getbatch", async (req, res) => {
  try {
    const batches = await db.Batch.find({ manufacturer: req.query.address });
    console.log(batches);

    if (batches) {
      res.status(200).json(batches);
    } else {
      res
        .status(404)
        .json({ message: "No batches found by this manufacturer" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getdistro", async (req, res) => {
  try {
    const user = await db.User.find({ role: "distributor" });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "No Distributors Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
