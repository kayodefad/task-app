import { useEffect, useState } from "react";
import styled from "styled-components";

import { getAllTasks, getSingleTask } from '../redux/features/task/taskSlice';
import { getUsers } from "../redux/features/user/userSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

import Task from "./task";
import TaskForm from "./taskForm";
import Loader from "./loader";

const Container = styled.div`
	border-radius: 4px;
	border: 1px solid #ddd;
	width: 320px;

	.header {
		display: flex;
		justify-content: space-between;
		height: 35px;
		align-items: center;
		background: #f2f0f2;
		color: gray;
		border-bottom: 1px solid #ddd;

		.left {
			text-transform: uppercase;
			margin-left: 10px;
			font-size: 13px;
			font-weight: 500;
			letter-spacing: 0.5px;
		}

		.right {
			padding: 0 10px;
			border-left: 1px solid #ddd;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.2rem;
			cursor: pointer;
		}
	}
`;

const Tasks = () => {
	const dispatch = useAppDispatch();
	const { loading, tasks } = useAppSelector((state) => state.task);
	const [showForm, setShowForm] = useState(false);
	const [taskForms, setTaskForms] = useState<{[key: string]: boolean}>({});
	const [activeTaskId, setActiveTaskId] = useState("");

	useEffect(() => {
		dispatch(getAllTasks());
		dispatch(getUsers());
		const forms: {[key: string]: boolean} = {};
		tasks.forEach((task) => {
			forms[task.id] = false;
		});
		setTaskForms(forms);
	}, [tasks.length]);

	const handleShowForm = () => {
		setActiveTaskId("");
		const forms: {[key: string]: boolean} = { ...taskForms };
		for (const form in forms) {
			forms[form] = false;
		}
		setTaskForms(forms);
		setShowForm(!showForm);
	};

	const handleShowEditForm = (id: string) => {
		if (!taskForms[id]) {
			dispatch(getSingleTask(id));
		}
		setShowForm(false);
		setActiveTaskId(id);
		const forms = { ...taskForms };
		for (let form in forms) {
			if (form !== id && forms[id] === false) {
				forms[form] = false;
			}
		}
		forms[id] = !forms[id];
		setTaskForms(forms);
	};

	return (
		<>
			{loading && <Loader />}
			<Container>
				<div className="header">
					<div className="left">Tasks {tasks.length}</div>
					<div onClick={handleShowForm} className="right">
						+
					</div>
				</div>
				{showForm && (
					<TaskForm setShowForm={setShowForm} activeTaskId={activeTaskId} />
				)}
				{tasks.map((task) => {
					return (
						<div key={task.id}>
							{!taskForms[task.id] && (
								<Task
									task={task}
									handleShowEditForm={() => handleShowEditForm(task.id)}
								/>
							)}
							{taskForms[task.id] && (
								<TaskForm
									activeTaskId={activeTaskId}
									setTaskForms={setTaskForms}
									taskForms={taskForms}
								/>
							)}
						</div>
					);
				})}
			</Container>
		</>
	);
};

export default Tasks;
