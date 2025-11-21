const {Schema, model} = require("mongoose");

const activitySchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { type: String, required: true},
    description: String,
    category: String,
    date: {type: Date, default: Date.now},
    points: {type: Number, defult: 0}
});

module.exports = model("Activity", activitySchema);
