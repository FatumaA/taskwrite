import "./index.css";
import { Route, Routes } from "react-router-dom";
import Task from "./routes/Task";
import Index from "./routes/Index";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/tasks" element={<Task />} />
			</Routes>
		</>
	);
}

export default App;
