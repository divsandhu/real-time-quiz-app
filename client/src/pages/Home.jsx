import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizService from "../services/quizService.js";

export default function Home() {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Please enter your username");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await quizService.createRoom(username, difficulty);
            const { roomId: newRoomId } = result;
            navigate(`/room/${newRoomId}`, { 
                state: { 
                    user: username, 
                    isHost: true 
                } 
            });
        } catch (error) {
            console.error("Error creating room:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        if (!username.trim() || !roomId.trim()) {
            setError("Please enter both username and room ID");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Check if room exists
            await quizService.joinRoom(roomId);
            
            navigate(`/room/${roomId}`, { 
                state: { 
                    user: username, 
                    isHost: false 
                } 
            });
        } catch (error) {
            console.error("Error joining room:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">AptitudeArena</h1>
                        <p className="text-gray-600">Join or create a quiz room</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={isCreatingRoom ? handleCreateRoom : handleJoinRoom}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        {isCreatingRoom && (
                            <div className="mb-4">
                                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quiz Difficulty
                                </label>
                                <select
                                    id="difficulty"
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        )}

                        {!isCreatingRoom && (
                            <div className="mb-4">
                                <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Room ID
                                </label>
                                <input
                                    type="text"
                                    id="roomId"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter room ID"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            {isLoading ? "Loading..." : (isCreatingRoom ? "Create Room" : "Join Room")}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsCreatingRoom(!isCreatingRoom);
                                setError("");
                                setRoomId("");
                            }}
                            className="text-blue-500 hover:text-blue-600 font-medium"
                        >
                            {isCreatingRoom ? "Join existing room instead" : "Create new room instead"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
