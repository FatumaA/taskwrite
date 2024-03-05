import "./index.css";
import AddTask from "./components/AddTask";
import Button from "./components/Button";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<main className="container mx-auto">
				<section className="max-w-5xl mx-auto m-12 p-0 md:p-16">
					<h1 className="text-5xl md:text-6xl font-bold text-center py-3">
						Taskwrite - Manage your tasks
					</h1>
					<div className="flex justify-end m-8">
						<Button
							extraBtnClasses="flex bg-pink-700 text-white  font-medium py-2 hover:bg-pink-800"
							text="View Tasks"
							icon={EyeIcon}
							iconClasses="hidden md:flex"
							handleClick={(e) => {
								e.preventDefault();
								navigate("/tasks");
							}}
						/>
					</div>
					<AddTask task={null} isEdit={false} />
				</section>
			</main>
		</>
	);
}

export default App;
