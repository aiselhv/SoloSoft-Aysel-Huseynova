import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  addTask, updateTask, deleteTask, getTasks,
  getDailyProgress, getWeeklyProgress,
  getRoadmap, updateTheme, deleteUser,
} from "./api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { user, logoutUser, theme, setTheme } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [dailyProgress, setDailyProgress] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [roadmapDuration, setRoadmapDuration] = useState("3months");
  const [activeTab, setActiveTab] = useState("tasks");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);

  const fetchAllData = async () => {
    if (!user?.userId) return;
    try {
      const [daily, weekly, tasksRes] = await Promise.all([
        getDailyProgress(user.userId),
        getWeeklyProgress(user.userId),
        getTasks(),
      ]);
      setDailyProgress(daily.data);
      setWeeklyProgress(weekly.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error("Veri yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchAllData();
  }, [user]);

  useEffect(() => {
    if (activeTab === "roadmap" && user) fetchRoadmap();
  }, [activeTab, roadmapDuration]);

  const fetchRoadmap = async () => {
    try {
      const res = await getRoadmap(user.userId, roadmapDuration);
      setRoadmap(res.data);
    } catch (err) {
      console.log("Roadmap error:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTaskLoading(true);
    try {
      const res = await addTask(newTask);
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "", dueDate: "" });
      fetchAllData();
    } catch {}
    setTaskLoading(false);
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: "completed" });
      setTasks(tasks.map((t) => ((t.id === taskId || t._id === taskId) ? { ...t, status: "completed" } : t)));
      fetchAllData();
    } catch {}
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId && t._id !== taskId));
      fetchAllData();
    } catch {}
  };

  const handleThemeToggle = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try { await updateTheme(user.userId, newTheme); } catch {}
  };

  const handleDeleteAccount = async () => {
  // 1. Önce ID kontrolü yapalım
  if (!user || (!user.userId && !user.id && !user._id)) {
    console.error("Hata: Kullanıcı ID bulunamadı!", user);
    alert("Kullanıcı bilgisi alınamadı, lütfen sayfayı yenileyip tekrar deneyin.");
    return;
  }

  const idTodelete = user.userId || user.id || user._id; // Her iki ihtimali de kontrol edelim

  setLoading(true);
  try {
    // 2. Silme isteğini gönder
    await deleteUser(idTodelete);
    
    // 3. Önce modalı kapat ki ekran temizlensin
    setShowDeleteModal(false);
    
    // 4. Çıkış yap ve yönlendir
    logoutUser();
    navigate("/register");
    
    alert("Hesabınız başarıyla silindi.");
  } catch (error) {
    console.error("Silme hatası:", error);
    alert("Hesap silinirken bir hata oluştu. Lütfen tekrar deneyin.");
  } finally {
    setLoading(false);
  }
};

  const tabs = [
    { id: "tasks", label: "📋 Görevler" },
    { id: "progress", label: "📊 İlerleme" },
    { id: "roadmap", label: "🗺️ Yol Haritası" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">🚀 CareerPilot</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{user?.email}</span>
            <button onClick={handleThemeToggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-lg">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onClick={() => { logoutUser(); navigate("/login"); }} className="text-sm text-red-500 hover:text-red-700 font-medium">
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* İLERLEME ÇUBUĞU */}
        {dailyProgress && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">Günlük İlerleme</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">%{dailyProgress.completionRate}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${dailyProgress.completionRate}%` }} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {dailyProgress.completedTasks}/{dailyProgress.totalTasks} görev tamamlandı
            </p>
          </div>
        )}

        {/* TABLAR */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* GÖREVLER SEKMESİ */}
        {activeTab === "tasks" && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Yeni Görev Ekle</h2>
              <form onSubmit={handleAddTask} className="space-y-3">
                <input value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Görev başlığı (örn: Python Projesi)" required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                
                <input value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Açıklama (opsiyonel)"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                
                <div className="flex gap-2">
                  <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <button type="submit" disabled={taskLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:bg-indigo-400">
                    {taskLoading ? "Ekleniyor..." : "Ekle"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Görev Listesi</h2>
              {tasks.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">Henüz görev eklenmedi</p>
              ) : (
                <ul className="space-y-2">
                  {tasks.map((task) => (
                    <li key={task._id || task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${task.status === "completed" ? "bg-green-500" : "bg-yellow-400"}`} />
                        <div>
                          <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-200"}`}>
                            {task.title}
                          </p>
                          {(task.dueDate || task.description) && (
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                              {task.dueDate} {task.description && `• ${task.description}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {task.status !== "completed" && (
                          <button onClick={() => handleCompleteTask(task._id || task.id)}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg hover:bg-green-200">
                            ✓
                          </button>
                        )}
                        <button onClick={() => handleDeleteTask(task._id || task.id)}
                          className="text-xs bg-red-100 dark:bg-red-900/30 text-red-500 px-2 py-1 rounded-lg hover:bg-red-200">
                          Sil
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* İLERLEME SEKMESİ */}
        {activeTab === "progress" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Haftalık Analiz</h2>
            {weeklyProgress && (
              <>
                <p className="text-sm text-gray-400 mb-4">Tamamlanma: %{weeklyProgress.weeklyCompletionRate}</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyProgress.days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        )}

        {/* YOL HARİTASI SEKMESİ */}
        {activeTab === "roadmap" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200">Kariyer Yol Haritası</h2>
              <div className="flex gap-2">
                <button onClick={() => setRoadmapDuration("3months")} className={`text-xs px-3 py-1 rounded-lg ${roadmapDuration === "3months" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white"}`}>3 Ay</button>
                <button onClick={() => setRoadmapDuration("6months")} className={`text-xs px-3 py-1 rounded-lg ${roadmapDuration === "6months" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white"}`}>6 Ay</button>
              </div>
            </div>
            {roadmap ? (
              <div className="space-y-4">
                {roadmap.milestones?.map((m, idx) => (
                  <div key={idx} className="border dark:border-gray-700 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold dark:text-white text-sm">Ay {m.month}: {m.title}</span>
                      <span className="text-xs text-indigo-500 font-bold">%{m.completionRate}</span>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {m.tasks?.map((t, i) => <li key={i} className="text-[10px] bg-white dark:bg-gray-800 p-1 rounded border dark:border-gray-700 dark:text-gray-300">{t}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : <p className="text-center py-10 dark:text-gray-400">Yükleniyor...</p>}
          </div>
        )}

        {/* TEHLİKE BÖLGESİ */}
        <div className="mt-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-5">
          <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">Hesabı Sil</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Bu işlem geri alınamaz.</p>
          <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium">Hesabı Sil</button>
        </div>
      </main>

      {/* SİLME MODALI */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold dark:text-white mb-2 text-center">Emin misiniz?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Tüm verileriniz kalıcı olarak silinecek.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 border py-2 rounded-xl dark:text-white text-sm">İptal</button>
              <button onClick={handleDeleteAccount} disabled={loading} className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-medium">
                {loading ? "Siliniyor..." : "Evet, Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}