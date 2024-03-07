import "./index.css";
// import AddTask from "./components/AddTask";
// import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { ITask } from "./models/interface";
import Task from "./routes/Task";
import Index from "./routes/Index";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<Navbar resetNavigation={true} />
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/tasks" element={<Task />} />
			</Routes>
		</>
	);
}

export default App;
