const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    c_name: { type: String, required: true },
    c_logo: { type: String, required: true },
    c_description: { type: String, required: true },
    c_address: { type: String, required: true },
    c_facebook: { type: String, required: true },
    c_linkedin: { type: String, required: true },
    hr_name: { type: String, required: true },
    hr_email: { type: String, required: true },
    hr_contact: { type: String, required: true },
}, {
    versionKey: false
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
