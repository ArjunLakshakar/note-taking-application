import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showInput, setShowInput] = useState(false); // ✅ toggle input
  const navigate = useNavigate();

  const API_URL = "https://note-taking-application-jws4.onrender.com/api/notes";
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Load user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create Note
  const handleCreateNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(
        API_URL,
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setNewNote("");
      setShowInput(false); // ✅ hide input after creation
    } catch (error) {
      console.error("Error creating note", error);
    }
  };

  // Delete Note
  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="logo" className="w-7 h-7" />
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        {/* User Card */}
        <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Welcome, {user?.name || "User"} !
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Email: {user?.email}
          </p>
        </div>

        {/* Create Note */}
        <div className="w-full max-w-3xl mb-6">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="w-full py-2 sm:py-3 bg-blue-600 text-base sm:text-lg text-white rounded-xl hover:bg-blue-700"
            >
              Create Note
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Write your note..."
                className="flex-1 border px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCreateNote}
                  className="px-4 sm:px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowInput(false)}
                  className="px-4 sm:px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl font-semibold py-2 text-left">
            Notes
          </h1>

          {/* Notes List */}
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-lg shadow"
              >
                <span className="text-sm sm:text-base break-words whitespace-pre-wrap w-[95%]">
                  {note.content}
                </span>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}

            {notes.length === 0 && (
              <p className="text-center text-gray-500 text-sm sm:text-base">
                No notes yet.
              </p>
            )}
          </div>
        </div>

      </div>


    </div>
  );
};

export default Dashboard;
