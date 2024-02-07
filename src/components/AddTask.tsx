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
		<form id="form" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Task Title</label>
				<input
					type="text"
					id="title"
					placeholder="Title of your task"
					defaultValue={isEdit ? task?.title : ""}
				/>
			</div>
			<div>
				<label htmlFor="description">Task Description</label>
				<textarea
					id="description"
					placeholder="Describe your task"
					defaultValue={isEdit ? task?.description : ""}
				/>
			</div>
			<div>
				<label htmlFor="description">Task Due Date</label>
				<input type="date" id="date" />
			</div>
			<button type="submit">Add Task</button>
		</form>
	);
};

export default AddTask;
