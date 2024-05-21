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
  try {
    const user = await db.User.findOne({ address: req.body.address });
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

router.get("/getCouriers", async (req, res) => {
  try {
    const couriers = await db.User.find({ role: "courier" });
    if (couriers === null) {
      res.status(404).json({ message: "No couriers registered on platform" });
    } else {
      res.status(200).json(couriers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Handles Notifications
router.post("/notification", async (req, res) => {
  const { senderAddress, receiverAddress, notification, date } = req.body;
  try {
    await db.Notification.create({
      senderAddress,
      receiverAddress,
      notification,
      date,
    });
    res.status(200).json({ message: "Notification Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getNotification/:address", async (req, res) => {
  try {
    const result = await db.Notification.find({
      receiverAddress: req.params.address,
    }).select({ _id: 1, notification: 1, date: 1 });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(`/updateStatus`, async (req, res) => {
  const { dispatchDetails, _id } = req.body;
  console.log(dispatchDetails);
  try {
    const dispatch = await db.Dispatch.findOne({
      batchId: dispatchDetails.batchId,
    });
    const notification = await db.Notification.findById(_id);
    if (!dispatch) {
      return res.status(404).json({ message: "Dispatch not found" });
    }
    dispatch.distributor.forEach((distro) => {
      if (
        distro.distributorAddress ===
        dispatchDetails.distributor.distributorAddress
      ) {
        distro.status = dispatchDetails.distributor.status;
      }
    });
    notification.notification.dispatchDetails.distributor.status =
      dispatchDetails.distributor.status;
    notification.markModified(
      "notification.dispatchDetails.distributor.status"
    );
    await notification.save();
    await dispatch.save();
    res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getBatchProgress", async (req, res) => {
  const { batchId } = req.query;

  try {
    const batch = await db.Dispatch.findOne({ batchId });

    if (!batch)
      return res.status(404).json({ message: "Batch does not Exist" });

    res.status(200).json(batch);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
