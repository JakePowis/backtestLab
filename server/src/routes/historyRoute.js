const router = require('express').Router();
const History = require('../models/History');

//Route     GET /history
//Desc      Result history held in MongoDB
//Access    Public

router.get('/', async (req, res) => {
    try {

        console.log("//////////////////////get history route hit///////////////////////////////")

        const fullHistory = await History.find();
        if (!fullHistory) throw Error('No History');

        res.status(200).json(fullHistory);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//Route     POST /history
//Desc      Post new result to MongoDB
//Access    Public

router.post('/', async (req, res) => {

    console.log("REQ BODY IS", req.body)
    const newHistory = new History({
        name: req.body.name,
        timeMode: req.body.timeMode,
        period: req.body.period,
        pair: req.body.pair,
        spread: req.body.spread,
        mode: req.body.mode,
        data: req.body.data
    });
    try {
        const addedHis = await newHistory.save();
        console.log("data added", addedHis)
        if (!addedHis) throw Error('Something went wrong saving the item');
        res.status(200).json(addedHis);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

//Route     DELETE /history
//Desc      Delete result from MongoDB
//Access    Public

router.delete('/', async (req, res) => {
    try {
        console.log("///////////////delete route hit///////////////////", req.body)
        const his = await History.findById(req.body.result);
        if (!his) throw Error('No item found');

        const removed = await his.remove();
        if (!removed)
            throw Error('Something went wrong while trying to delete the item');

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
});

module.exports = router