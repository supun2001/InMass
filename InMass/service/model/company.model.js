const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    c_name: { type: String, required: true },
    c_logo: { type: String, required: true },
    c_description: { type: String, required: true },
    c_address: { type: String, required: true },
    facebook: { type: String },
    linkedin: { type: String },
    hr_name: { type: String, required: true },
    hr_email: { type: String, required: true },
    hr_number: { type: String, required: true }
}, {
    versionKey: false
})

const company = mongoose.model('company', companySchema);
module.exports = company;