const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: function(){return moment().add(1, 'hour');} },
    description: { type: String }
});


module.exports = Event = mongoose.model("Event", eventSchema);