const { Schema, model, Types } = require('mongoose');

const datasetSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Types.ObjectId, ref: 'user', required: true },
    cover: { type: String },         // URL or path to the cover image
    category: { type: String, required: true },
    downloadUrl: { type: String },   // Official download / source link
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('dataset', datasetSchema);