import { createDocument, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";

// pass a task and an isEdit boolean
// if isEdit is true, then the form will be populated with the task's data
interface ITaskFormProps {
	task: ITask | null;
	isEdit: boolean;
}

const AddTask = ({ task, isEdit }: ITaskFormProps) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = document.getElementById("form") as HTMLFormElement;

		const title = (e.currentTarget.elements[0] as HTMLInputElement).value;
		const description = (e.currentTarget.elements[1] as HTMLTextAreaElement)
			.value;
		const date = (e.currentTarget.elements[2] as HTMLInputElement).value;

		const payload: IPayload = {
			title,
			description,
			due_date: date,
		};

		if (isEdit && task) {
			await updateDocument(payload, task!.$id);
		} else {
			await createDocument(payload);
		}

		form.reset();
	};

	return (
		<form id="form" onSubmit={handleSubmit} className="m-8">
			<div className="flex flex-col mb-4">
				<label htmlFor="title" className="mb-1">
					Task Title
				</label>
				<input
					type="text"
					id="title"
					placeholder="Title of your task"
					defaultValue={isEdit ? task?.title : ""}
					className="border rounded-sm border-slate-800 p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label htmlFor="description" className="mb-1">
					Task Description
				</label>
				<textarea
					id="description"
					placeholder="Describe your task"
					defaultValue={isEdit ? task?.description : ""}
					className="border rounded-sm border-slate-800 p-2 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
			</div>
			<div className="flex flex-col mb-4">
				<label htmlFor="description" className="mb-1">
					Task Due Date
				</label>
				<input
					type="date"
					id="date"
					className="border rounded-sm border-slate-800 p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
			</div>
			<button
				type="submit"
				className=" bg-pink-700 text-white font-semibold px-4 py-2 rounded-md outline-1 hover:bg-pink-800 focus:ring-1 focus:ring-pink-800 w-full"
			>
				{task ? "Edit Task" : "Add Task"}
			</button>
		</form>
	);
};

export default AddTask;
