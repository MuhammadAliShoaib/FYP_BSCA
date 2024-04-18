import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/getStock", async (req, res) => {
  try {
    const stock = await db.Dispatch.aggregate([
      {
        $match: {
          "pharmacy.pharmaAddress":
            "0x64D960696643321b26976fb64f8c91EDFb04Ae18",
        },
      },
      {
        $lookup: {
          from: "batches",
          foreignField: "batchId",
          localField: "batchId",
          as: "batchDetails",
        },
      },
      {
        $unwind: "$batchDetails",
      },
    ]);

    res.status(200).json(stock);
    // console.log(stock)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updateDispatch", async (req, res) => {
  const { updateDispatch } = req.body;
  console.log(updateDispatch.batchId, "  ", updateDispatch.quantity);
  try {
    const dispatch = await db.Dispatch.findOne({
      batchId: updateDispatch.batchId,
    });
    if (dispatch) {
      dispatch.pharmacy.forEach((pharma) => {
        if (pharma.pharmaAddress === updateDispatch.pharmaAddress) {
          pharma.deliveredAmount -= updateDispatch.qtySold;
          pharma.medicineSold += updateDispatch.qtySold;
        }
      });
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
