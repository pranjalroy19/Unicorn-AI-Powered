import jwt from "jsonwebtoken";

/**
 * generateToken(id)
 * - Creates a JWT that encodes the user id.
 * - Expires in 30 days by default.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1000d",
  });
};

export default generateToken;
