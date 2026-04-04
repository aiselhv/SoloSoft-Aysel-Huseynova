const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getSkillMatrix,
  updateSkill,
  getRoadmap,
  getDailyProgress,
  getWeeklyProgress,
  updateTheme,
  deleteUser,
} = require("../controllers/userController");

router.get("/skills/matrix", auth, getSkillMatrix);
router.put("/skills/:skillId", auth, updateSkill);
router.get("/roadmap/:userId", auth, getRoadmap);
router.get("/progress/daily/:userId", auth, getDailyProgress);
router.get("/progress/weekly/:userId", auth, getWeeklyProgress);
router.put("/:userId/theme", auth, updateTheme);
router.delete("/:userId", auth, deleteUser);

module.exports = router;
