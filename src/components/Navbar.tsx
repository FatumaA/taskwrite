import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { PencilIcon } from "@heroicons/react/24/solid";
import Select from "./Select";
import { useState } from "react";

const Navbar = () => {
	const navigate = useNavigate();

	const themeArray = ["light", "dark", "system"];
	const [theme, setTheme] = useState(themeArray[2]);

	const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const selectedTheme = e.target.value;
		setTheme(selectedTheme);

		const isDarkModePreferred = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (selectedTheme === "system") {
			document.documentElement.classList.toggle("dark", isDarkModePreferred);
			document.documentElement.classList.toggle("light", !isDarkModePreferred);
		} else if (selectedTheme === "light") {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.remove("light");
			document.documentElement.classList.add("dark");
		}
	};

	return (
		<nav className="py-4 border-b-2 border-container shadow-md shadow-gray-400 w-full fixed top-0 bg-base">
			<ul className="flex items-center justify-between  w-11/12 mx-auto">
				<Link to="/">
					<Button
						handleClick={(e) => {
							e.preventDefault();
							navigate("/");
						}}
						text="Taskwrite"
						textClasses="font-semibold text-main"
						icon={PencilIcon}
						iconClasses="text-main"
					/>
				</Link>
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/tasks"
						className="font-semibold hover:scale-105 transition duration-300 ease-in-out"
					>
						View Tasks
					</Link>
					<div className="flex gap-2 items-center">
						<span className="font-semibold"> Theme: </span>
						<Select
							defaultSelectValue={theme}
							selectOptions={themeArray}
							handleSelectChange={handleSelectTheme}
						/>
					</div>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
