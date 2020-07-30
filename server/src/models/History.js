const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

// Create Schema
const HistorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timeMode: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    pair: {
        type: String,
        required: true
    },
    spread: {
        type: Number,
        // required: true
    },
    mode: {
        type: String,
        // required: true
    },
    data: {
        type: Object,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const History = model('histories', HistorySchema);

module.exports = History;
