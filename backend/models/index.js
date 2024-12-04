const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

// Initialize Mongoose
db.mongoose = mongoose;
db.url = dbConfig.url;

// Import models
const { User, Category, Product, Order, Payment, Voucher } = require("./models.js");

// Assign models to the `db` object
db.User = User;
db.Category = Category;
db.Product = Product;
db.Order = Order;
db.Payment = Payment;
db.Voucher = Voucher;

module.exports = db;