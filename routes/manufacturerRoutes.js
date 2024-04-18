import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

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

router.get("/meds", async (req, res) => {
  try {
    const meds = await db.Product.find({
      manufacturer: req.query.manufacturer,
    });
    console.log(meds);
    if (meds.length > 0) {
      res.status(200).json(meds);
    } else {
      res.status(404).json({
        message: "Medicine by manufacturer not found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Creates a batch by Manufacturer
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

// Gets batches created by the Manufacturer
router.get("/getbatch", async (req, res) => {
  try {
    const batches = await db.Batch.find({
      manufacturer: req.query.manufacturer,
    });
    console.log(batches);

    if (batches) {
      res.status(200).json(batches);
    } else {
      res.status(404).json({
        message: "No batches found by this manufacturer",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Gets all the Distributors
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

// Dispatches a Batch from Manufacturer
router.post("/dispatch", async (req, res) => {
  const { dispatch } = req.body;
  try {
    const existingDispatch = await db.Dispatch.findOne({
      batchId: dispatch.batchId,
    });
    const batch = await db.Batch.findOne({ batchId: dispatch.batchId });
    if (batch) {
      if (batch.quantity - dispatch.distributor.distributedAmount >= 0) {
        if (existingDispatch) {
          batch.quantity -= dispatch.distributor.distributedAmount;
          existingDispatch.distributor.push({
            distributedAmount: dispatch.distributor.distributedAmount,
            distributorAddress: dispatch.distributor.distributorAddress,
          });

          await batch.save();
          await existingDispatch.save();
        } else {
          batch.quantity -= dispatch.distributor.distributedAmount;
          const newDispatch = await db.Dispatch.create({
            batchId: dispatch.batchId,
            status: "Dispatched",
            distributor: [
              {
                distributedAmount: dispatch.distributor.distributedAmount,
                distributorAddress: dispatch.distributor.distributorAddress,
              },
            ],
            pharmacy: [],
            transactions: [],
          });
          await batch.save();
        }

        res.status(200).json({ message: "Dispatch successful!" });
      } else res.status(400).json({ message: "Batch quantity exceeded!" });
    } else res.status(400).json({ message: "Batch does not exists." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
