import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getSkillMatrix, updateSkill } from "./api";

const LEVELS = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];

export default function SkillMatrix() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matrix, setMatrix] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ level: "", score: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchMatrix();
  }, [user]);

  const fetchMatrix = async () => {
    try {
      const res = await getSkillMatrix();
      setMatrix(res.data);
    } catch {}
    setLoading(false);
  };

  const handleEdit = (skill) => {
    setEditing(skill.id);
    setEditForm({ level: skill.level, score: skill.score });
  };

  const handleSave = async (skillId) => {
    setSaving(true);
    try {
      await updateSkill(skillId, editForm);
      setMatrix({
        ...matrix,
        skills: matrix.skills.map((s) =>
          s.id === skillId ? { ...s, ...editForm } : s
        ),
      });
      setEditing(null);
    } catch {}
    setSaving(false);
  };

  const getLevelColor = (level) => {
    const colors = {
      Beginner: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      Elementary: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      Intermediate: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      Advanced: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      Expert: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[level] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")}
            className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline">
            ← Geri
          </button>
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">🧠 Skill Matrix</h1>
          <div />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-400 py-10">Yükleniyor...</p>
        ) : matrix ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">Kariyer Hedefi</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{matrix.careerGoal}</p>
            </div>

            <div className="space-y-3">
              {matrix.skills.map((skill) => (
                <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
                  {editing === skill.id ? (
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-700 dark:text-gray-200">{skill.name}</p>
                      <div className="flex gap-3 flex-wrap">
                        <select value={editForm.level} onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          {LEVELS.map((l) => <option key={l}>{l}</option>)}
                        </select>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600 dark:text-gray-300">Puan:</label>
                          <input type="number" min="0" max="100" value={editForm.score}
                            onChange={(e) => setEditForm({ ...editForm, score: Number(e.target.value) })}
                            className="w-20 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleSave(skill.id)} disabled={saving}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg disabled:bg-indigo-400">
                          {saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full transition-all"
                              style={{ width: `${skill.score}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 w-10 text-right">
                            %{skill.score}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleEdit(skill)}
                        className="ml-4 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600">
                        Güncelle
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-10">Veri bulunamadı</p>
        )}
      </main>
    </div>
  );
}
