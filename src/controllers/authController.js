const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /auth/register
const register = async (req, res) => {
  try {
    const { fullName, email, password, careerGoal, skills } = req.body;

    if (!fullName || !email || !password || !careerGoal) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Bu email zaten kullanılıyor" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const skillList = (skills || []).map((s) => ({
      skillName: typeof s === "string" ? s : s.skillName,
      level: "Beginner",
      score: 0,
    }));

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      careerGoal,
      skills: skillList,
    });

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      careerGoal: user.careerGoal,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email ve şifre zorunludur" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      tokenType: "Bearer",
      expiresIn: 86400,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

module.exports = { register, login };