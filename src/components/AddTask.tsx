import { SparklesIcon } from "@heroicons/react/24/solid";
import { createDocument, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import { callAI } from "../utils/ai";
import { useEffect, useState } from "react";
import Speaker from "../components/Speaker";
import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";

// pass a task and an isEdit boolean
// if isEdit is true, then the form will be populated with the task's data
interface ITaskFormProps {
	task: ITask | null;
	isEdit: boolean;
}

const AddTask = ({ task, isEdit }: ITaskFormProps) => {
	const { transcript, resetTranscript } = useSpeechToTextHelper();

	const [titleVal, setTitleVal] = useState("");
	const [textAreaVal, setTextAreaVal] = useState("");

	useEffect(() => {
		if (isEdit && task) {
			setTitleVal(task.title);
			setTextAreaVal(task.description);
		} else {
			setTitleVal(transcript || "");
		}
	}, [isEdit, task, transcript]);

	const clearTranscript = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		resetTranscript();
	};

	const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
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

	const generateDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!titleVal) return alert("Please provide a title for the task");

		const prompt = `Provide a description for this task: ${titleVal}. Keep the description to a maximum of 30 words`;

		try {
			const res = await callAI(prompt);
			return setTextAreaVal(await res.text());
		} catch (error) {
			console.log("ERROR HUGGING FACE API: " + error);
		}
	};

	return (
		<form id="form" onSubmit={handleSubmitTask} className="m-8">
			<div className="flex flex-col mb-4">
				<div className="flex flex-row justify-between items-center">
					<label htmlFor="title">Task Title</label>
					<Speaker handleClear={clearTranscript} />
				</div>
				<input
					type="text"
					id="title"
					placeholder="Title of your task"
					value={titleVal}
					onChange={(e) => setTitleVal(e.target.value)}
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
					value={textAreaVal}
					onChange={(e) => setTextAreaVal(e.target.value)}
					className="border rounded-sm border-slate-800 p-2 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
				<button
					onClick={generateDesc}
					className="bg-gray-200 rounded-md mt-2 w-fit px-2 py-1 ml-auto flex items-cemter hover:scale-105 transition duration-300 ease-in-out"
				>
					<span className="mr-1">Generate description</span>
					<SparklesIcon height={20} />
				</button>
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
				className="bg-pink-700 text-white font-semibold px-4 py-2 rounded-md outline-1 hover:bg-pink-800 focus:ring-1 focus:ring-pink-800 w-full"
			>
				{task ? "Edit Task" : "Add Task"}
			</button>
		</form>
	);
};

export default AddTask;
