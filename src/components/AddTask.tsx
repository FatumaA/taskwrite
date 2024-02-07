import { createDocument } from "../db/db";
import { IPayload } from "../models/interface";

const AddTask = () => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = (e.currentTarget.elements[0] as HTMLInputElement).value;
		const description = (e.currentTarget.elements[1] as HTMLTextAreaElement)
			.value;
		const date = (e.currentTarget.elements[2] as HTMLInputElement).value;

		const payload: IPayload = {
			title,
			description,
			due_date: date,
		};

		const res = await createDocument(payload);

		const form = document.getElementById("form") as HTMLFormElement;

		form.reset();

		console.log("FORM TEST", res);
	};

	return (
		<form id="form" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Task Title</label>
				<input type="text" id="title" placeholder="Title of your task" />
			</div>
			<div>
				<label htmlFor="description">Task Description</label>
				<textarea id="description" placeholder="Describe your task" />
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
