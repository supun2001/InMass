const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobschema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    j_title: { type: String, required: true },
    j_post: { type: String, required: true },
    j_des: { type: String, required: true },
    j_company: { type: String, required: true },
    j_location: { type: String, required: true },
    j_requirement: { type: String, required: true },
    j_keywords: { type: String, required: true },
}, {
    versionKey: false
});

const Jobs = mongoose.model('Jobs', jobschema);
module.exports = Jobs;
