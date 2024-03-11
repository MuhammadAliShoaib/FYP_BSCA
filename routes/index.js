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
            return res
                .status(422)
                .json({ message: "User address already exists!" });
        }

        const userByName = await db.User.findOne({ name: name });

        if (userByName !== null) {
            return res
                .status(422)
                .json({ message: "User name already exists!" });
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
    // console.log("Address : " + req.params.address)
    try {
        const meds = await db.Product.find({ manufacturer: req.query.manufacturer });
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
                        distributedAmount:
                            dispatch.distributor.distributedAmount,
                        distributorAddress:
                            dispatch.distributor.distributorAddress,
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
                                distributedAmount:
                                    dispatch.distributor.distributedAmount,
                                distributorAddress:
                                    dispatch.distributor.distributorAddress,
                            },
                        ],
                        pharmacy: [],
                        transactions: [],
                    });
                    await batch.save();
                }

                res.status(200).json({ message: "Dispatch successful!" });
            } else
                res.status(400).json({ message: "Batch quantity exceeded!" });
        } else res.status(400).json({ message: "Batch does not exists." });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

// Gets batches dispatched to Distributor to create order for Pharmacy
router.get("/getDispatches", async (req, res) => {
    // console.log("Address: ", req.query.distributorAddress)
    try {
        const dispatches = await db.Dispatch.find({'distributor.distributorAddress':  req.query.distributorAddress})
        // console.log('Dispatches', dispatches)
        if (dispatches) {
            res.status(200).json(dispatches);
        } else {
            res.status(404).json({
                message: "No dispatches to distributors name",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})

// To get all the Pharmacies
router.get('/getPharma', async (req, res) => {
    try {
        const pharma = await db.User.find({role: 'pharmacy'})
        if(pharma) {
            res.status(200).json(pharma)
        } else {
            res.status(404).json({message: "Pharmacies not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

// Distributor: Update Dispatch
router.post('/updateDispatch', async (req, res) => {
    const {updateDispatch} = req.body;
    console.log( updateDispatch.batchId, "  ", updateDispatch.quantity)
    try {
        const dispatch = await db.Dispatch.findOne({batchId: updateDispatch.batchId})
        dispatch.distributor.forEach((distro) => {
            if(distro.distributorAddress === updateDispatch.distroAddress) {
                distro.distributedAmount -= updateDispatch.quantity
            }
        })
        dispatch.pharmacy.push({
            pharmaName: updateDispatch.pharmaName,
            deliveredAmount: updateDispatch.quantity,
            medicineSold: 0,
            pharmaTransactions: [],
        },)
        await dispatch.save()
        res.status(200).json({message: "Dispatch Updates Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

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

export default router;
