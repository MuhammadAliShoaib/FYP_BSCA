import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

// Gets batches dispatched to Distributor to create order for Pharmacy
router.get("/getDispatches", async (req, res) => {
  try {
    const dispatches = await db.Dispatch.aggregate([
      {
        $match: {
          "distributor.distributorAddress":
            "0x7e3989EC5689f60aED26e683c8f87cB9A4a22DC4",
        },
      },
      {
        $lookup: {
          from: "batches",
          foreignField: "batchId",
          localField: "batchId",
          as: "batch",
        },
      },
      {
        $unwind: "$batch",
      },
    ]);
    if (dispatches) {
      res.status(200).json(dispatches);
    } else {
      res.status(404).json({
        message: "No dispatches to distributors name",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

// To get all the Pharmacies
router.get("/getPharma", async (req, res) => {
  try {
    const pharma = await db.User.find({ role: "pharmacy" });
    if (pharma) {
      res.status(200).json(pharma);
    } else {
      res.status(404).json({ message: "Pharmacies not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Dispatch
router.post("/updateDispatch", async (req, res) => {
  const { updateDispatch } = req.body;
  try {
    const dispatch = await db.Dispatch.findOne({
      batchId: updateDispatch.batchId,
    });
    if (dispatch) {
      dispatch.distributor.forEach((distro) => {
        if (distro.distributorAddress === updateDispatch.distroAddress) {
          distro.distributedAmount -= updateDispatch.quantity;
          distro.status = "Dispacted to Pharmacy";
        }
      });
      let pharmacyExists = false;
      dispatch.pharmacy.forEach((pharma) => {
        if (pharma.pharmaAddress === updateDispatch.pharmaAddress) {
          pharma.deliveredAmount += updateDispatch.quantity;
          pharmacyExists = true;
        }
      });
      if (!pharmacyExists) {
        dispatch.pharmacy.push({
          pharmaAddress: updateDispatch.pharmaAddress,
          deliveredAmount: updateDispatch.quantity,
          medicineSold: 0,
          pharmaTransactions: [],
        });
      }
      await dispatch.save();
      res.status(200).json({ message: "Dispatch Updates Successfully" });
    } else {
      res.status(404).json({ message: "Dispatch not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
