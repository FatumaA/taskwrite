import { SparklesIcon } from "@heroicons/react/24/solid";
import { createDocument, updateDocument } from "../utils/db";
import { IPayload, ITask } from "../models/interface";
import { callAI } from "../utils/ai";
import { useEffect, useState } from "react";
import Speaker from "../components/Speaker";
import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import Select from "./Select";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../utils/shared";
import Button from "./Button";

// pass a task and an isEdit boolean
// if isEdit is true, then the form will be populated with the task's data
interface ITaskFormProps {
	task: ITask | null;
	isEdit?: boolean;
	setIsEdit?: (isEdit: boolean) => void;
	setTasks?: (tasks: ITask[]) => void;
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
			setTitleValidationError("Please provide at least a title for the task");
			setTimeout(() => setTitleValidationError(""), 2000);
			return;
		}

		if (titleVal.length > 49) {
			setTitleValidationError(
				"Title too long. It can only be 49 characters long"
			);
			setTimeout(() => setTitleValidationError(""), 2000);
			return; // Removed unnecessary else
		}

		const payload: IPayload = {
			title: titleVal,
			description: textAreaVal,
			due_date: dueDate,
			priority: priority,
		};

		if (isEdit && task) {
			await updateDocument(payload, task!.$id);
			// setIsEdit!(false);
			const allTaks = await getTasks();
			if (setTasks) return setTasks(allTaks.reverse());
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

		if (!titleVal) {
			alert("Please provide a title for the task");
			return;
		}
		setIsGenerating(true);

		const prompt = `Provide a description for this task: ${titleVal}. Keep the description to a maximum of 30 words`;

		try {
			const res = await callAI(prompt);
			const responseText = await res.text();

			setIsGenerating(false);

			responseText.split("").forEach((char, index) => {
				setTimeout(() => {
					setTextAreaVal((prevText) => prevText + char);
				}, index * 32);
			});
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
					className={`bg-inherit border rounded-sm p-2 focus:outline-none focus:ring-1 ${
						titleValidationError
							? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
							: "border-input focus:ring-slate-900"
					}`}
				/>
				{titleValidationError && (
					<span className="text-error mt-1">{titleValidationError}</span>
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
					className={`bg-inherit border rounded-sm p-2 h-32 resize-none focus:outline-none focus:ring-1 ${
						textAreaVal.length > 197
							? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
							: "border-input focus:ring-slate-900"
					}`}
				/>
				{textAreaVal.length > 197 && (
					<span className="text-error mt-1">
						Warning description getting too long. Can only be 200 characters
					</span>
				)}
				<Button
					handleClick={generateDesc}
					content={{
						text: "Generate description",
						icon: SparklesIcon,
					}}
					extraBtnClasses="bg-light mt-2 w-fit ml-auto"
					iconClasses="h-5"
				/>
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
					className="bg-inherit border rounded-sm border-input p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
				/>
			</div>
			<Button
				type="submit"
				content={{
					text: task ? "Edit Task" : "Add Task",
				}}
				disable={isSubmitting}
				extraBtnClasses="bg-primary justify-center text-white font-semibold px-4 py-2 outline-1 hover:bg-primaryHover focus:ring-1 focus:ring-pink-800 w-full"
			/>
		</form>
	);
};

export default AddTask;
