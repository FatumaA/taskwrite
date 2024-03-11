import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import Button from "./Button";
import { ITask } from "../models/interface";

interface DialogProps {
	setIsViewTask?: (isViewTask: boolean) => void;
	setSearchedTasks?: (tasks: ITask[]) => void;
	children: ReactNode;
}

function Dialog({ setIsViewTask, setSearchedTasks, children }: DialogProps) {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		if (setIsViewTask) setIsViewTask(false);
		if (setSearchedTasks) setSearchedTasks([]);
		setIsOpen(false);
	};
	return (
		<dialog
			open={isOpen}
			id="modal"
			style={{
				backgroundColor: "var(--base-bg)",
				color: "var(--text-main)",
			}}
			className={`${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			} transition-opacity duration-300 ease-in-out fixed inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 w-4/6 border border-container rounded-md max-h-[80vh] overflow-y-auto text-main`}
		>
			<Button
				handleClick={closeModal}
				extraBtnClasses="ml-auto text-main font-medium hover:text-error mt-2"
			>
				<span>Close</span>
				<XMarkIcon height={25} />
			</Button>
			<div className="max-h-[80vh] overflow-y-auto">{children}</div>
		</dialog>
	);
}

export default Dialog;
