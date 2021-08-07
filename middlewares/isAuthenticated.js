// const User = require("../models/User");

// const isAuthenticated = async (req, res, next) => {
//   try {
//     // Get client token
//     const token = req.headers.authorization.replace("Bearer ", "");
//     // Find user with token
//     const user = await User.findOne({ token: token }).select("account");
//     // If found (next)
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       // Else ==> "Unauthorized"
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = isAuthenticated;
