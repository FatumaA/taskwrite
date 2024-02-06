import React from "react";

const AddTask = () => {
	return (
		<form>
			<div>
				<label htmlFor="title">Task Title</label>
				<input type="text" id="title" placeholder="Title of your task" />
			</div>
			<div>
				<label htmlFor="description">Task Description</label>
				<textarea
					type="text"
					id="description"
					placeholder="Describe your task"
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
