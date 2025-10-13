import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Fields must not be empty" });
    }

    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1d"})
      return res.status(200).json({
         message: "Login Success" ,
        token});
    }

    return res.status(401).json({ message: "Invalid Credentials" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
