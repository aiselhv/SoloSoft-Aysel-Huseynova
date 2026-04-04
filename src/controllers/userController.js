const User = require("../models/User");
const Task = require("../models/Task");

// GET /skills/matrix
const getSkillMatrix = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    res.status(200).json({
      userId: user._id,
      careerGoal: user.careerGoal,
      skills: user.skills.map((s) => ({
        id: s._id,
        name: s.skillName,
        level: s.level,
        score: s.score,
        required: true,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// PUT /skills/:skillId
const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { skillName, level, score } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const skill = user.skills.id(skillId);
    if (!skill) return res.status(404).json({ message: "Beceri bulunamadı" });

    if (skillName) skill.skillName = skillName;
    if (level) skill.level = level;
    if (score !== undefined) skill.score = score;

    await user.save();

    res.status(200).json({
      id: skill._id,
      skillName: skill.skillName,
      level: skill.level,
      score: skill.score,
      updatedAt: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// GET /roadmap/:userId
const getRoadmap = async (req, res) => {
  try {
    const { userId } = req.params;
    const duration = req.query.duration || "3months";
    const months = duration === "6months" ? 6 : 3;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const milestones = Array.from({ length: months }, (_, i) => ({
      month: i + 1,
      title: `${user.careerGoal} - Ay ${i + 1}`,
      tasks: ["Teori çalışması", "Pratik proje", "Değerlendirme"],
      completionRate: i === 0 ? 40 : 0,
    }));

    res.status(200).json({
      userId: user._id,
      duration,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      milestones,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// GET /progress/daily/:userId
const getDailyProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({
      userId,
      date: today.toISOString().split("T")[0],
      totalTasks: total,
      completedTasks: completed,
      completionRate: rate,
      progressToGoal: Math.round(rate / 4),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// GET /progress/weekly/:userId
const getWeeklyProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const tasks = await Task.find({
      userId,
      createdAt: { $gte: weekStart, $lte: weekEnd },
    });

    const dayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    const days = dayNames.map((day) => {
      const dayTasks = tasks.filter((t) => {
        const d = new Date(t.createdAt);
        return dayNames[d.getDay() === 0 ? 6 : d.getDay() - 1] === day;
      });
      return {
        day,
        completed: dayTasks.filter((t) => t.status === "completed").length,
        total: dayTasks.length,
      };
    });

    const totalCompleted = days.reduce((acc, d) => acc + d.completed, 0);
    const totalAll = days.reduce((acc, d) => acc + d.total, 0);

    res.status(200).json({
      userId,
      weekStart: weekStart.toISOString().split("T")[0],
      weekEnd: weekEnd.toISOString().split("T")[0],
      days,
      weeklyCompletionRate: totalAll > 0 ? Math.round((totalCompleted / totalAll) * 100) : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// PUT /users/:userId/theme
const updateTheme = async (req, res) => {
  try {
    const { userId } = req.params;
    const { theme } = req.body;

    if (!["light", "dark"].includes(theme)) {
      return res.status(400).json({ message: "Tema 'light' veya 'dark' olmalıdır" });
    }

    const user = await User.findByIdAndUpdate(userId, { theme }, { new: true });
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    res.status(200).json({
      userId: user._id,
      theme: user.theme,
      updatedAt: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    await Task.deleteMany({ userId });

    res.status(204).send();
  } catch (error) {
    console.log("Delete error:", error.message);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

module.exports = {
  getSkillMatrix,
  updateSkill,
  getRoadmap,
  getDailyProgress,
  getWeeklyProgress,
  updateTheme,
  deleteUser,
};