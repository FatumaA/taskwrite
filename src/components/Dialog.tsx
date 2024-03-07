import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import { ITask } from "../models/interface";
import Button from "./Button";

interface DialogProps {
	isEdit?: boolean;
	setIsEdit?: (isEdit: boolean) => void;
	setSearchedTasks?: (tasks: ITask[]) => void;
	children: ReactNode;
}

function Dialog({
	setIsEdit,
	isEdit,
	setSearchedTasks,
	children,
}: DialogProps) {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		if (setIsEdit) setIsEdit(!isEdit);
		if (setSearchedTasks) setSearchedTasks([]);

		setIsOpen(false);
	};
	return (
		<dialog
			open={isOpen}
			id="modal"
			className="p-8 fixed inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 w-4/6 border border-container rounded-md max-h-[80vh] overflow-y-auto text-main bg-inherit"
		>
			<Button
				handleClick={closeModal}
				content={{ text: "Close", icon: XMarkIcon }}
				extraBtnClasses="ml-auto text-main font-medium hover:text-error"
			/>
			<div className="max-h-[80vh] overflow-y-auto">{children}</div>
		</dialog>
	);
}

export default Dialog;
