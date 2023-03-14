import express from "express"
import Rent from "../model/Rent.js"

const router = express.Router()


router.get("/", async (req, res) => {
    const rents = await Rent.find()
    if (rents.length < 1) {
        res.status(404).json({ message: "No rent available" })
    }
    res.status(200).json(rents)
})

router.post("/", async (req, res) => {
    const { Name, Address, Images, Amount, Rating, Property, Duration } = req.body

    if (!(Name || Address || Images || Amount || Rating || Property || Duration)) {
        res.status(400).json({ message: "All field Required" })
    }

    const existinRent = await Rent.findOne({ Name })

    if (!existinRent) {
        const newRent = await Rent.create({
            Name, Address, Images, Amount, Rating, Property, Duration
        })
        res.status(201).json(newRent)
        return;
    }
    res.status(409).json({ message: "Already exist" })
})

router.put("/:id", async (req, res) => {
    const { Name, Address, Images, Amount, Rating, Property, Duration } = req.body

    if (JSON.stringify(req.body) === '{}' || !(Name && Address && Images && Amount && Rating && Property && Duration)) {
        res.status(400).json({ message: "Please fill the input correctly" })
        console.log('first')
        return;
    }

    const newRent = await Rent.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (newRent) {
        res.status(200).json(newRent)
        return;
    }
    res.status(404).json({ message: "Not Found" })

})

router.delete("/:id", async (req, res) => {
    const newRent = await Rent.findByIdAndDelete(req.params.id)
    if (newRent) {
        res.status(200).json({ message: `Rent with the id:${req.params.id} deleted` })
    }
    res.status(404).json({ message: `Not found` })

})


export default router
