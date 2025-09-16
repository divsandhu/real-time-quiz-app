import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<RoomWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component to extract route params and location state
function RoomWrapper() {
  const { roomId } = useParams();
  const location = useLocation();
  const user = location.state?.user || "Guest";
  const isHost = location.state?.isHost || false;
  
  return <Room roomId={roomId} user={user} isHost={isHost} />;
}

export default App;
