import { SparklesIcon } from "@heroicons/react/24/solid";
import { createDocument, updateDocument } from "../db/db";
import { IPayload, ITask } from "../models/interface";
import { callAI } from "../utils/ai";
import { useEffect, useState } from "react";
import Speaker from "../components/Speaker";
import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import Select from "./Select";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../utils/shared";

// pass a task and an isEdit boolean
// if isEdit is true, then the form will be populated with the task's data
interface ITaskFormProps {
	task: ITask | null;
	isEdit?: boolean;
	setIsEdit?: (isEdit: boolean) => void;
	setTasks: (tasks: ITask[]) => void;
}

const AddTask = ({ task, isEdit, setIsEdit, setTasks }: ITaskFormProps) => {
	const navigate = useNavigate();
	const { transcript, resetTranscript } = useSpeechToTextHelper();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const [titleVal, setTitleVal] = useState("");
	const [textAreaVal, setTextAreaVal] = useState("");
	const [dueDate, setDueDate] = useState(
		isEdit && task?.due_date ? new Date(task.due_date) : new Date()
	);

	const priorityArray = ["low", "medium", "high"];

	const [priority, setPriority] = useState(
		isEdit && task?.priority ? task?.priority : priorityArray[0]
	);

	const [titleValidationError, setTitleValidationError] = useState("");

	useEffect(() => {
		if (isEdit && task) {
			setTitleVal(task.title);
			setTextAreaVal(task.description);
		} else {
			setTitleVal(transcript || "");
		}
	}, [isEdit, task, transcript]);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitleVal(e.target.value);

		if (e.target.value.trim() !== "") {
			setTitleValidationError("");
		}
	};

	const clearTranscript = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		resetTranscript();
	};

	const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!titleVal) {
			setTitleValidationError("Please provide atleast a title for the task");
			return setTimeout(() => {
				setTitleValidationError("");
			}, 2000);
		}

		if (titleVal.length > 49) {
			setTitleValidationError(
				"Title too long. It can only be 49 characters long"
			);
			return setTimeout(() => {
				setTitleValidationError("");
			}, 2000);
		}

		const payload: IPayload = {
			title: titleVal,
			description: textAreaVal,
			due_date: dueDate,
			priority: priority,
		};

		if (isEdit && task) {
			await updateDocument(payload, task!.$id);
			setIsEdit!(false);
			const allTaks = await getTasks();
			return setTasks(allTaks.reverse());
		} else {
			await createDocument(payload);
		}

		// reset form
		setTitleVal("");
		setTextAreaVal("");
		setDueDate(new Date());
		setPriority(priorityArray[0]);
		setTitleValidationError("");
		setIsSubmitting(false);
		navigate("/tasks");
	};

	const generateDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setTextAreaVal("");

		if (!titleVal) return alert("Please provide a title for the task");
		setIsGenerating(true);

		const prompt = `Provide a description for this task: ${titleVal}. Keep the description to a maximum of 30 words`;

		try {
			const res = await callAI(prompt);
			setIsGenerating(false);
			return setTextAreaVal(await res.text());
		} catch (error) {
			console.log("ERROR HUGGING FACE API: " + error);
		}
	};

	return (
		<form id="form" onSubmit={handleSubmitTask} className="m-8">
			<div className="flex flex-col mb-6">
				<div className="flex flex-row justify-between items-center">
					<label htmlFor="title">Task Title</label>
					<Speaker handleClear={clearTranscript} />
				</div>
				<input
					type="text"
					id="title"
					placeholder="Title of your task"
					value={titleVal}
					onChange={handleTitleChange}
					className={`border rounded-sm p-2 focus:outline-none focus:ring-1 ${
						titleValidationError
							? "border-red-600 focus:ring-red-500 invalid:focus:ring-red-600"
							: "border-slate-800 focus:ring-slate-900"
					}`}
				/>
				{titleValidationError && (
					<span className="text-red-500 mt-1">{titleValidationError}</span>
				)}
			</div>
			<div className="flex flex-col mb-6">
				<label htmlFor="description" className="mb-1">
					Task Description
				</label>
				<textarea
					id="description"
					placeholder="Describe your task"
					maxLength={200}
					value={isGenerating ? "generating..." : textAreaVal}
					onChange={(e) => setTextAreaVal(e.target.value)}
					className={`border rounded-sm p-2 h-32 resize-none focus:outline-none focus:ring-1 ${
						textAreaVal.length > 197
							? "border-red-600 focus:ring-red-500 invalid:focus:ring-red-600"
							: "border-slate-800 focus:ring-slate-900"
					}`}
				/>
				{textAreaVal.length > 197 && (
					<span className="text-red-500 mt-1">
						Warning description getting too long. Can only be 200 characters
					</span>
				)}
				<button
					onClick={generateDesc}
					className="bg-gray-200 rounded-md mt-2 w-fit px-2 py-1 ml-auto flex items-cemter hover:scale-105 transition duration-300 ease-in-out"
				>
					<span className="mr-1">Generate description</span>
					<SparklesIcon height={20} />
				</button>
			</div>
			<div className="flex flex-col mb-6">
				<label htmlFor="description" className="mb-1">
					Task Priority
				</label>
				<Select
					defaultSelectValue={priority}
					selectOptions={priorityArray}
					handleSelectChange={(e) => setPriority(e.target.value)}
				/>
			</div>
			<div className="flex flex-col mb-6">
				<label htmlFor="description" className="mb-1">
					Task Due Date
				</label>
				<input
					type="date"
					id="date"
					value={dueDate!.toISOString().split("T")[0]}
					min={new Date().toISOString().split("T")[0]}
					onChange={(e) => setDueDate(new Date(e.target.value))}
					className="border rounded-sm border-slate-800 p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
			</div>
			<button
				disabled={isSubmitting}
				type="submit"
				className="bg-pink-700 text-white font-semibold px-4 py-2 rounded-md outline-1 hover:bg-pink-800 focus:ring-1 focus:ring-pink-800 w-full"
			>
				{task ? "Edit Task" : "Add Task"}
			</button>
		</form>
	);
};

export default AddTask;
