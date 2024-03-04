import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import { ITask } from "../models/interface";

interface DialogProps {
	isEdit?: boolean;
	setIsEdit?: (isEdit: boolean) => void;
	setSearchedTasks?: (tasks: ITask[]) => void;
	children: ReactNode;
}

function Dialog({ setIsEdit, isEdit, children }: DialogProps) {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		if (setIsEdit) setIsEdit(!isEdit);
		// if (setSearchedTasks) setSearchedTasks([]);

		setIsOpen(false);
	};
	return (
		<dialog
			open={isOpen}
			id="modal"
			className="p-8 fixed inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 w-4/6 border border-gray-400 rounded-md max-h-[80vh] overflow-y-auto"
		>
			<button
				onClick={closeModal}
				id="closeModal"
				className="flex gap-2 ml-auto font-medium hover:text-red-500"
			>
				<span>Close </span>
				<XMarkIcon height={25} />
			</button>
			<div className="max-h-[80vh] overflow-y-auto">{children}</div>
		</dialog>
	);
}

export default Dialog;
