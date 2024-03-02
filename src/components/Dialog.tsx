import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ITask } from "../models/interface";
import AddTask from "./AddTask";

interface DialogProps {
	isEdit: boolean;
	setIsEdit: (isEdit: boolean) => void;
	task: ITask;
}

function Dialog({ setIsEdit, isEdit, task }: DialogProps) {
	const closeModal = () => {
		setIsEdit(!isEdit);
	};
	return (
		<dialog
			open={true}
			id="modal"
			className="p-8 fixed inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-50 w-4/6 border border-gray-400 rounded-md"
		>
			<button
				onClick={closeModal}
				id="closeModal"
				className="flex gap-2 ml-auto font-medium hover:text-red-500"
			>
				<span>Close </span>
				<XMarkIcon height={25} />
			</button>
			<AddTask
				key={task!.$id}
				task={task!}
				isEdit={true}
				setIsEdit={setIsEdit}
			/>
		</dialog>
	);
}

export default Dialog;
