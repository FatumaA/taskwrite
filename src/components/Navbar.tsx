import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { PencilIcon } from "@heroicons/react/24/solid";
import Select from "./Select";

const Navbar = () => {
	const navigate = useNavigate();

	const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
	};

	const themeArray = ["light", "dark", "system"];
	return (
		<nav className="py-4 border border-b-2 shadow-md w-full fixed top-0">
			<ul className="flex items-center justify-between  w-11/12 mx-auto">
				<Link to="/">
					<Button
						handleClick={(e) => {
							e.preventDefault();
							navigate("/");
						}}
						text="Taskwrite"
						textClasses="font-semibold"
						icon={PencilIcon}
					/>
				</Link>
				<div className="flex items-center justify-between gap-6">
					<Link
						to="/tasks"
						className="font-semibold hover:scale-105 transition duration-300 ease-in-out"
					>
						My Tasks
					</Link>
					<div className="flex gap-2 items-center">
						<span className="font-semibold"> Theme: </span>
						<Select
							defaultSelectValue={themeArray[2]}
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
