const {Schema, model} = require("mongoose");

const activitySchema = new Schema({
    title: { type: String, required: true},
    description: String,
    category: String,
    date: {type: Date, defult: Date.now},
    points: {type: Number, defult: 0}
});

module.exports = model("Activity", activitySchema);
