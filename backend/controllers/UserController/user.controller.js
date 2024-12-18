const User = require("../../models/index").User;
const Order = require("../../models/index").Order;
const Product = require("../../models/index").Product;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup

exports.postSignup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    if (!["retailer", "customer"].includes(role)) {
      return res.status(400).send({ message: "Invalid role!" });
    }

    const userData = await User.create(name, email, password, role);

    if (userData === 1) {
      return res.status(400).send({ message: "Email already exists!" });
    }

    res.status(200).send({ message: "User registered successfully", user: userData });
  } catch (err) {
    res.status(500).send({ message: err.message || "Signup error." });
  }
};

// login

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", {
      expiresIn: "1d",
    });

    res.status(200).send({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).send({ message: "Error during login", error: err.message });
  }
};


// Xem profile admin 
// Xem profile retailer
// Xem profile customer

exports.getProfile = async (req, res) => {
  try {
    const userID  = req.user.id
    // Validate userID format

    // Find user

    userInfo = await User.getInfo(userID)

    // Handle user not found
    if (!userInfo) {
      return res.status(404).send({ message: 'User not found' });
    }

    console.log(userInfo)

    // Return user info
    res.status(200).json({
      id: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      gender: userInfo.gender,
      birthday: userInfo.birthday,
      region: userInfo.region,
      avatar: userInfo.avatar
    });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Internal server error' });
  }
};

// Update profile admin
// Update profile retailer 
// Update profile retailer

exports.postUpdateProfile = (req, res) => {
  console.log(req.body)
  const {id} = req.user;
  const { name, email, birthday, gender, region } = req.body;


  try {
    User.update(id, name, email, birthday, gender, region);
    res.status(200).json({ message: "Update succesful!" })
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Update Error' });
  }
};

// Delete retailer

exports.postDeleteUser = (req, res) => {
  const { id } = req.user;

  try {
    User.delete(id);
    res.status(200).json({ message: "Delete succesful!" })
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Delete Error' });
  }
};


exports.getAdminDashboardData = async (req, res) => {
  try {
    // Fetch total products
    const retailerCount = await User.countDocuments({ role: 'retailer' });

    // Fetch total orders
    const totalOrders = await Order.countDocuments(); // -> Total orders

    // Fetch total delivered orders
    const totalDelivered = await Order.countDocuments({ status: 'completed' }); // -> Delieved 

    // Calculate total revenue

    const orders = await Order.find({ status: 'completed' }); // ID  -> Mảng

    // sum là giá trị tích lũy, order là currentValue khi lướt qua mảng, 0 là giá trị khởi tạo, đây là loop
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

    // Send the response
    res.json({
      retailerCount,
      totalOrders,
      totalDelivered,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching dashboard data' });
  }
};

// retailer dashboard
exports.getRetailerDashboardData = async (req, res) => {
  try {
    const {id} = req.user;  
    console.log(id)

    if (!id) {
      return res.status(400).send({ message: "Retailer ID is required." });
    }

    // Fetch total products
    const productCount = await Product.countDocuments({ user_id: id });

    // Fetch total orders
    const totalOrders = await Order.countDocuments({ retailer_id: id }); // Tổng số orders của retailer

    // Fetch total delivered orders
    const totalDelivered = await Order.countDocuments({ retailer_id: id, status: 'completed' }); // Số đơn đã giao

    // Calculate total revenue
    const orders = await Order.find({ retailer_id: id, status: 'completed' }); // Fetch orders đã hoàn thành

    // Tính tổng doanh thu
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

    const allCategory = Category.filterCategories();

    // Fetch product list và populate category
    const productList = await Product.find({ user_id: id })
      .select("name size price category_id") // Chỉ chọn các trường cần thiết
      .populate({
        path: 'category_id', // Trường để populate
        select: 'category target', // Các trường muốn lấy từ Category
      });

    // Tạo response JSON
    res.json({
      productCount,
      totalOrders,
      totalDelivered,
      totalRevenue,
      productList,
      allCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error fetching dashboard data' });
  }
};
