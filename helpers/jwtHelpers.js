const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (userInfo) => {

  try {
    const payload = {
      Email: userInfo.Email,
      role: userInfo.role,
    };

    console.log(payload);

    // Token generation
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      // expiresIn: '1h', 
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};