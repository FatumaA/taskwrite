import React from "react";

const AddTask = () => {
	return (
		<form>
			<div className="form-group">
				<label htmlFor="title">Task Title</label>
				<input
					type="text"
					className="form-control"
					id="title"
					placeholder="Title of your task"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="description">Task Description</label>
				<textarea
					type="text"
					className="form-control"
					id="description"
					placeholder="Describe your task"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="description">Task Due Date</label>
				<input type="date" className="form-control" id="date" />
			</div>
			<button type="submit" className="btn btn-primary">
				Add Task
			</button>
		</form>
	);
};

export default AddTask;
