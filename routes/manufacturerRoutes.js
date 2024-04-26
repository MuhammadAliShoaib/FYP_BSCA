import express from "express";
const router = express.Router();
import { db } from "../models/index.js";

router.post("/addProduct", async (req, res) => {
  const { name, dosage, activeIngredient, manufacturer } = req.body;
  const completeName = [name, dosage, activeIngredient].join(" - ");
  try {
    const product = await db.Product.findOne({ name: req.body.name });
    if (product !== null && product.dosage === dosage) {
      res.status(400).json({ message: "Product Already Exists" });
    } else {
      await db.Product.create({
        name,
        dosage,
        activeIngredient,
        completeName,
        manufacturer,
      });
      res.status(200).json({ message: "Product Added" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/removeProduct");

router.get("/medicines", async (req, res) => {
  try {
    const meds = await db.Product.find({
      manufacturer: req.query.manufacturer,
    });
    console.log("Medicines: ", meds);
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
router.post("/createBatch", async (req, res) => {
  const {
    batchId,
    medicine,
    containerType,
    packSize,
    unit,
    cartonSize,
    quantity,
    mfg,
    exp,
    manufacturer,
  } = req.body;
  try {
    const batch = await db.Batch.findOne({ batchId: req.body.batchId });
    if (batch) {
      res.status(403).json({ message: "Batch was being duplicated" });
    } else {
      await db.Batch.create({
        batchId,
        medicine,
        containerType,
        packSize,
        unit,
        cartonSize,
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

router.get("/medicineBatches", async (req, res) => {
  try {
    const meds = await db.Product.aggregate([
      {
        $match: {
          manufacturer: req.query.manufacturer,
        },
      },
      {
        $lookup: {
          from: "batches",
          foreignField: "medicine",
          localField: "completeName",
          as: "medicineBatches",
        },
      },
      {
        $match: {
          medicineBatches: { $ne: [] },
        },
      },
    ]);
    console.log(meds);

    if (meds !== null) {
      res.status(200).json(meds);
    } else
      res.status(404).json({ messsage: "No Medicine with Batches Available" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Gets all the Distributors
router.get("/getDistro", async (req, res) => {
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

    if (!batch)
      return res.status(404).json({ message: "Batch does not exists" });
    if (batch.quantity < dispatch.distributor.distributorSupply)
      return res
        .status(400)
        .json({ message: "Available Batch Quantity Exceeded" });

    if (existingDispatch) {
      batch.quantity -= dispatch.distributor.distributorSupply;
      let courierExists = existingDispatch.courier.some((courier) => {
        courier === dispatch.courier;
      });
      if (!courierExists) {
        existingDispatch.courier.push(dispatch.courier);
      }
      let distroExists = existingDispatch.distributor.some(
        (distro) =>
          distro.distributorAddress === dispatch.distributor.distributorAddress
      );
      if (distroExists) {
        existingDispatch.distributor.forEach((distro) => {
          if (
            distro.distributorAddress ===
            dispatch.distributor.distributorAddress
          ) {
            distro.distributorSupply += dispatch.distributor.distributorSupply;
          }
        });
      } else {
        existingDispatch.distributor.push({
          distributorAddress: dispatch.distributor.distributorAddress,
          distributorSupply: dispatch.distributor.distributorSupply,
          distributedAmount: 0,
        });
      }

      await batch.save();
      await existingDispatch.save();
    } else {
      batch.quantity -= dispatch.distributor.distributorSupply;
      const newDispatch = await db.Dispatch.create({
        batchId: dispatch.batchId,
        status: "Dispatched",
        courier: [dispatch.courier],
        distributor: [
          {
            distributorAddress: dispatch.distributor.distributorAddress,
            distributorSupply: dispatch.distributor.distributorSupply,
            distributedAmount: 0,
          },
        ],
        pharmacy: [],
        transactions: [],
      });
      console.log(newDispatch);
      await batch.save();
    }

    res.status(200).json({ message: "Dispatch successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

// // Gets batches created by the Manufacturer
// router.get("/getBatch", async (req, res) => {
//   const { manufacturer, medicine } = req.query;
//   try {
//     const batches = await db.Batch.find({
//       manufacturer,
//       medicine,
//     });
//     console.log(batches);

//     if (batches) {
//       res.status(200).json(batches);
//     } else {
//       res.status(404).json({
//         message: "No batches found by this manufacturer",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
