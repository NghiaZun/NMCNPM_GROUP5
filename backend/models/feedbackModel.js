const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Customer who is giving the feedback
  retailer_id: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // Retailer
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // The product being reviewed
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  comment: { type: String, maxlength: 500 }, // Optional comment
  created_at: { type: Date, default: Date.now }, // Time the feedback was submitted
}, 
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
