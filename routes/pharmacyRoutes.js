import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.get("/getStock", async (req, res) => {
  const { pharmaAddress } = req.query;
  try {
    const stock = await db.Dispatch.aggregate([
      {
        $unwind: "$distributor",
      },
      {
        $unwind: "$distributor.pharmacy",
      },
      {
        $match: {
          "distributor.pharmacy.pharmaAddress": pharmaAddress,
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
      {
        $project: {
          _id: 0,
          batchId: 1,
          courier: 1,
          "distributor.status": 1,
          "distributor.distributorName": 1,
          "distributor.distributorAddress": 1,
          "distributor.distributorSupply": 1,
          "distributor.distributedAmount": 1,
          "distributor.distroTransactions": 1,
          "distributor.pharmacy.pharmaName": 1,
          "distributor.pharmacy.pharmaAddress": 1,
          "distributor.pharmacy.deliveredAmount": 1,
          "distributor.pharmacy.medicineSold": 1,
          "distributor.pharmacy.pharmaTransactions": 1,
          batchDetails: 1,
        },
      },
    ]);
    console.log(stock);
    res.status(200).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/getStock", async (req, res) => {
//   const { pharmaAddress } = req.query;
//   try {
//     const stock = await db.Dispatch.aggregate([
//       {
//         $match: {
//           "pharmacy.pharmaAddress": pharmaAddress,
//         },
//       },
//       {
//         $lookup: {
//           from: "batches",
//           foreignField: "batchId",
//           localField: "batchId",
//           as: "batchDetails",
//         },
//       },
//       {
//         $unwind: "$batchDetails",
//       },
//     ]);

//     res.status(200).json(stock);
//     // console.log(stock)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/updateDispatch", async (req, res) => {
  const { updateDispatch, distro, txnHash } = req.body;
  console.log(updateDispatch.batchId, "  ", updateDispatch.qtySold);

  try {
    const dispatch = await db.Dispatch.findOne({
      batchId: updateDispatch.batchId,
    });

    if (dispatch) {
      let pharmaUpdated = false;

      dispatch.distributor.forEach((distributor) => {
        if (distributor.distributorAddress === distro) {
          distributor.pharmacy.forEach((pharma) => {
            if (pharma.pharmaAddress === updateDispatch.pharmaAddress) {
              pharma.deliveredAmount -= updateDispatch.qtySold;
              pharma.medicineSold += updateDispatch.qtySold;
              pharma.pharmaTransactions.push(txnHash);
              pharmaUpdated = true;
            }
          });
        }
      });

      if (pharmaUpdated) {
        await dispatch.save();
        res.status(200).json({ message: "Dispatch updated successfully" });
      } else {
        res.status(404).json({ message: "Pharmacy not found in the dispatch" });
      }
    } else {
      res.status(404).json({ message: "Dispatch not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/updateDispatch", async (req, res) => {
//   const { updateDispatch } = req.body;
//   console.log(updateDispatch.batchId, "  ", updateDispatch.quantity);
//   try {
//     const dispatch = await db.Dispatch.findOne({
//       batchId: updateDispatch.batchId,
//     });
//     if (dispatch) {

//       dispatch.pharmacy.forEach((pharma) => {
//         if (pharma.pharmaAddress === updateDispatch.pharmaAddress) {
//           pharma.deliveredAmount -= updateDispatch.qtySold;
//           pharma.medicineSold += updateDispatch.qtySold;
//         }
//       });
//       await dispatch.save();
//       res.status(200).json({ message: "Dispatch Updates Successfully" });
//     } else {
//       res.status(404).json({ message: "Dispatch not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

export default router;
