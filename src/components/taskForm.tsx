import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import styled from 'styled-components';
import { format } from 'date-fns';

import taskIcon from '../assets/icons/task-icon.png';
import clockIcon from '../assets/icons/clock-icon.png';
import deleteIcon from '../assets/icons/delete-icon.png';

import { getUsers } from '../redux/features/user/userSlice';
import {
	addTask,
	deleteTask,
	updateTask,
} from '../redux/features/task/taskSlice';
import { getTimeList, getKeyByValue } from '../shared/utils';

import DatePicker from './datepicker';

const Container = styled.div`
	padding: 10px;
	background: #ecf7fc;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;

		.form-label {
			color: #555;
			font-size: 14px;
		}

		.date-time {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 6px;
		}

		input,
		select,
		.date-picker {
			display: block;
			width: 100%;
			margin-top: 5px;
			height: 28px;
			padding: 0 7px;
			outline: none;
			border: 1px solid #ddd;
			border-radius: 4px;
			background: #fff;
			color: gray;
			font-size: 14px;
		}

		input:focus {
			border: 1px solid #0dd9d9;
		}

		.date-picker {
			display: flex;
			align-items: center;

			&:focus {
				border: 1px solid blue;
			}
		}

		.task-desc {
			position: relative;
			.task-icon {
				position: absolute;
				width: 13px;
				right: 5px;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.time {
			position: relative;
			.clock-icon {
				position: absolute;
				width: 13px;
				left: 5px;
				top: 50%;
				transform: translateY(-50%);
			}
			.time-picker {
				padding: 0 23px;
			}
			.time-list {
				position: absolute;
				color: #555;
				font-size: 13px;
				background: #fff;
				box-shadow: -4px 8px 7px -1px rgba(145, 136, 136, 0.47);
				-webkit-box-shadow: -4px 8px 7px -1px rgba(145, 136, 136, 0.47);
				-moz-box-shadow: -4px 8px 7px -1px rgba(145, 136, 136, 0.47);
				height: 200px;
				overflow: auto;
			}
			.time-item {
				padding: 5px 15px 5px 5px;
				&:hover {
					background: #0dd9d9;
					color: #fff;
				}
			}
		}

		.bottom {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: 13px;
				cursor: pointer;
			}
			.btn-group {
				display: flex;
				gap: 5px;
				.btn {
					font-size: 13px;
					padding: 7px 25px;
					cursor: pointer;
				}
				.btn-cancel {
					color: #555;
					border: none;
					background: transparent;
				}
				.btn-submit {
					color: #fff;
					background: #47bb7f;
					border: none;
					border-radius: 4px;
				}
			}
		}

		.error {
			color: red;
			font-size: 12px;
		}
	}
`;

type TaskFormProps = {
	setShowForm?: (show: boolean) => void;
	setTaskForms?: (forms: { [key: string]: boolean }) => void;
	taskForms?: { [key: string]: boolean };
	activeTaskId: string;
};

const TaskForm = ({
	setShowForm,
	setTaskForms,
	taskForms,
	activeTaskId,
}: TaskFormProps) => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector((state) => state.user);
	const { task } = useAppSelector((state) => state.task);
	const [userId, setUserId] = useState('');
	const [taskMessage, setTaskMessage] = useState('');
	const [messageError, setMessageError] = useState('');
	const [userError, setUserError] = useState('');
	const [timeError, setTimeError] = useState('');
	const [showTimeList, setShowTimeList] = useState(false);
	const [taskDate, setTaskDate] = useState(new Date());
	const [taskTime, setTaskTime] = useState('');
	const timeList = getTimeList();
	const characterLimit = 22;

	const handleDateChange = (date: Date) => {
		setTaskDate(date);
	};

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	useEffect(() => {
		if (activeTaskId) {
			if (task) {
				setTaskMessage(task.task_msg);
				setUserId(task.assigned_user);
				setTaskDate(new Date(task.task_date));
				setTaskTime(getKeyByValue(timeList, task.task_time) || '');
			}
		}
	}, [task]);

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setUserId(e.target.value);
	};

	const handleTimeList = () => {
		setShowTimeList(!showTimeList);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessageError('');
		setUserError('');
		setTimeError('');
		if (taskMessage.length > characterLimit) {
			setMessageError(
				`Task message should not exceed ${characterLimit} characters`
			);
			return;
		}
		if (userId === '') {
			setUserError('Select a user');
			return;
		}
		if (taskTime === '') {
			setTimeError('Select time');
			return;
		}

		const formEntries = {
			assigned_user: userId,
			task_date: format(new Date(taskDate), 'yyyy-MM-dd'),
			task_time: timeList[taskTime],
			is_completed: 0,
			time_zone: -new Date().getTimezoneOffset() * 60,
			task_msg: taskMessage,
		};

		if (activeTaskId) {
			dispatch(updateTask({ id: activeTaskId, updatedTask: formEntries }));
		} else {
			dispatch(addTask(formEntries));
		}
		closeForm();
	};

	const closeForm = () => {
		if (activeTaskId) {
			setTaskForms?.({ ...taskForms, [activeTaskId]: false });
		} else {
			setShowForm?.(false);
		}
	};

	const handleTimeChange = (time: string) => {
		setTaskTime(time);
		setShowTimeList(false);
	};

	const handleDeleteTask = () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this Task?'
		);
		if (confirmDelete) {
			dispatch(deleteTask(activeTaskId));
			closeForm();
		}
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="description" className="form-label">
						Task Description
					</label>
					<div className="task-desc">
						<input
							value={taskMessage}
							onChange={(e) => setTaskMessage(e.target.value)}
							type="text"
							name="description"
							id="description"
							required
						/>
						{messageError && <span className="error">{messageError}</span>}
						<img className="task-icon" src={taskIcon} alt="task icon" />
					</div>
				</div>
				<div className="date-time">
					<div className="form-group">
						<label htmlFor="date" className="form-label">
							Date
						</label>
						<div className="date-picker">
							<DatePicker date={taskDate} handleChange={handleDateChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="time" className="form-label">
							Time
						</label>
						<div className="time">
							<div className="date-picker time-picker" onClick={handleTimeList}>
								{taskTime === '' ? 'Time' : taskTime}
							</div>
							<img className="clock-icon" src={clockIcon} alt="clock icon" />
							{showTimeList && (
								<div className="time-list">
									{Object.keys(timeList).map((time, index) => {
										return (
											<p
												onClick={() => handleTimeChange(time)}
												key={index}
												className="time-item"
											>
												{time}
											</p>
										);
									})}
								</div>
							)}
						</div>
						{timeError && <span className="error">{timeError}</span>}
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="user" className="form-label">
						Assign User
					</label>
					<select value={userId} onChange={handleSelect}>
						<option value="">None</option>
						{users.map((user) => {
							return (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							);
						})}
					</select>
					{userError && <span className="error">{userError}</span>}
				</div>
				<div className="bottom">
					<img
						onClick={handleDeleteTask}
						style={{ visibility: `${activeTaskId ? 'visible' : 'hidden'}` }}
						src={deleteIcon}
						alt="delete icon"
					/>
					<div className="btn-group">
						<button
							onClick={closeForm}
							type="button"
							className="btn btn-cancel"
						>
							Cancel
						</button>
						<button type="submit" className="btn btn-submit">
							Save
						</button>
					</div>
				</div>
			</form>
		</Container>
	);
};

export default TaskForm;
