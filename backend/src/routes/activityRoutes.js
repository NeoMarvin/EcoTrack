const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Activity = require("../models/Activity.js")


router.post('/', async(req, res) => {
    const{ title, description, category, date, points } = req.body
    try{
        const newActivity = new Activity({ title, description, category, date, points })
        const savedActivity = await newActivity.save()
        res.status(201).json(savedActivity);
    }catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/', async(req, res) => {
    try {
        const fecthActivities = await Activity.find()
        res.json(fecthActivities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:id', async(req, res) => {
    try {
        const  fecthActivity = await Activity.findById(req.params.id)
        if (!fecthActivity) {
            return res.status(404).json("Activity not found!..")
        } 
        res.json(fecthActivity)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.put('/:id', async(req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if(!updatedActivity) {
            return res.status(404).json("Not found...")
        } 
        res.status(200).json(updatedActivity)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.delete('/:id', async(req, res) => {
    try {
        const deleteActivity = await Activity.findByIdAndDelete(req.params.id)
        if(!deleteActivity) {
            return res.status(404).json("Not found..")
        }
        res.status(200).json("Activity deleted...")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;