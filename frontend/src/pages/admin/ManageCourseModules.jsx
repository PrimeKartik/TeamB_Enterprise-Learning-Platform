import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/client";

export default function ManageCourseModules() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // New module form state
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDesc, setNewModuleDesc] = useState("");
  const [newModuleYoutubeLink, setNewModuleYoutubeLink] = useState("");
  const [newModuleReferenceBook, setNewModuleReferenceBook] = useState("");

  // Quiz form state (simplified, assumes 1 quiz per module)
  const [activeQuizModuleId, setActiveQuizModuleId] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
      },
    ],
  });

  useEffect(() => {
    fetchCourseAndModules();
  }, [id]);

  const fetchCourseAndModules = async () => {
    try {
      const [courseRes, modulesRes] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get(`/courses/${id}/modules`),
      ]);
      setCourse(courseRes.data);
      setModules(modulesRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/courses/${id}/modules`, {
        title: newModuleTitle,
        description: newModuleDesc,
        youtubeLink: newModuleYoutubeLink,
        referenceBook: newModuleReferenceBook,
        moduleOrder: modules.length + 1,
      });
      setNewModuleTitle("");
      setNewModuleDesc("");
      setNewModuleYoutubeLink("");
      setNewModuleReferenceBook("");
      fetchCourseAndModules();
    } catch (error) {
      console.error("Failed to add module", error);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm("Delete this module?")) return;
    try {
      await api.delete(`/modules/${moduleId}`);
      fetchCourseAndModules();
    } catch (error) {
      console.error("Failed to delete module", error);
    }
  };

  const handleOpenQuizForm = (mod) => {
    setActiveQuizModuleId(mod.id);
    if (mod.quiz) {
      setQuizForm({
        title: mod.quiz.title,
        description: mod.quiz.description,
        questions: mod.quiz.questions.length > 0 ? mod.quiz.questions : [{
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        }],
      });
    } else {
      setQuizForm({
        title: "",
        description: "",
        questions: [{
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        }],
      });
    }
  };

  const handleQuizChange = (field, value) => {
    setQuizForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQs = [...quizForm.questions];
    updatedQs[index][field] = value;
    setQuizForm((prev) => ({ ...prev, questions: updatedQs }));
  };

  const handleAddQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        },
      ],
    }));
  };

  const handleSaveQuiz = async () => {
    try {
      const module = modules.find((m) => m.id === activeQuizModuleId);
      if (module.quiz) {
        await api.put(`/quizzes/${module.quiz.id}`, quizForm);
      } else {
        await api.post(`/modules/${activeQuizModuleId}/quiz`, quizForm);
      }
      setActiveQuizModuleId(null);
      fetchCourseAndModules();
    } catch (error) {
      console.error("Failed to save quiz", error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Modules for: {course?.title}
        </h1>
        <button
          onClick={() => navigate("/admin/courses")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Courses
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Module</h2>
        <form onSubmit={handleAddModule} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Module Title"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Module Description"
            value={newModuleDesc}
            onChange={(e) => setNewModuleDesc(e.target.value)}
            className="border p-2 rounded"
            rows="2"
          />
          <input
            type="text"
            placeholder="YouTube Link (optional)"
            value={newModuleYoutubeLink}
            onChange={(e) => setNewModuleYoutubeLink(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Reference Book (optional)"
            value={newModuleReferenceBook}
            onChange={(e) => setNewModuleReferenceBook(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-max"
          >
            Add Module
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {modules.map((mod, index) => (
          <div key={mod.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Module {index + 1}: {mod.title}
                </h3>
                <p className="text-sm text-gray-500">{mod.description}</p>
                {mod.youtubeLink && (
                  <p className="text-sm text-[#EC4899]">
                    <a href={mod.youtubeLink} target="_blank" rel="noopener noreferrer">YouTube Reference</a>
                  </p>
                )}
                {mod.referenceBook && (
                  <p className="text-sm text-gray-600">
                    Reference Book: {mod.referenceBook}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenQuizForm(mod)}
                  className="px-3 py-1 bg-purple-950/60 border border-purple-800/40 text-purple-300 rounded-lg hover:bg-purple-900/60 hover:text-white transition text-xs font-semibold"
                >
                  {mod.quiz ? "Edit Quiz" : "+ Add Quiz"}
                </button>
                <button
                  onClick={() => handleDeleteModule(mod.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Quiz Editor Inline */}
            {activeQuizModuleId === mod.id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Practice Quiz Editor</h4>
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Quiz Title"
                    value={quizForm.title}
                    onChange={(e) => handleQuizChange("title", e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Quiz Description"
                    value={quizForm.description}
                    onChange={(e) => handleQuizChange("description", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>

                <div className="space-y-4">
                  {quizForm.questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-4 border rounded bg-gray-50">
                      <p className="font-medium text-sm mb-2">Question {qIndex + 1}</p>
                      <input
                        type="text"
                        placeholder="Question Text"
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                        className="border p-2 rounded w-full mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Option A"
                          value={q.optionA}
                          onChange={(e) => handleQuestionChange(qIndex, "optionA", e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="text"
                          placeholder="Option B"
                          value={q.optionB}
                          onChange={(e) => handleQuestionChange(qIndex, "optionB", e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="text"
                          placeholder="Option C"
                          value={q.optionC}
                          onChange={(e) => handleQuestionChange(qIndex, "optionC", e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="text"
                          placeholder="Option D"
                          value={q.optionD}
                          onChange={(e) => handleQuestionChange(qIndex, "optionD", e.target.value)}
                          className="border p-2 rounded"
                        />
                      </div>
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                        className="border p-2 rounded"
                      >
                        <option value="A">Correct Answer: A</option>
                        <option value="B">Correct Answer: B</option>
                        <option value="C">Correct Answer: C</option>
                        <option value="D">Correct Answer: D</option>
                      </select>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button onClick={handleAddQuestion} className="px-3 py-1 bg-gray-200 rounded">
                    + Add Question
                  </button>
                  <button onClick={handleSaveQuiz} className="px-3 py-1 bg-green-600 text-white rounded">
                    Save Quiz
                  </button>
                  <button onClick={() => setActiveQuizModuleId(null)} className="px-3 py-1 bg-red-100 text-red-700 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {mod.quiz && activeQuizModuleId !== mod.id && (
              <div className="mt-3 p-3 bg-purple-50 rounded text-sm text-purple-700">
                <span className="font-semibold">Practice Quiz Attached:</span> {mod.quiz.title} ({mod.quiz.questions?.length || 0} questions)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
