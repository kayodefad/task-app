import { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import editIcon from "../assets/icons/edit-icon.png";
import snoozeIcon from "../assets/icons/snooze-icon.png";
import tickIcon from "../assets/icons/tick-icon.png";
import { TaskModel } from "../redux/features/task/taskSlice";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	.left {
		display: flex;
		align-items: center;
		gap: 10px;

		.avatar {
			border: 1px solid #ddd;
			border-radius: 4px;
			width: 40px;
			height: 40px;
			img {
				width: 100%;
			}
		}

		.message {
			font-size: 14px;
			font-weight: 500;
		}
		.date {
			font-size: 12px;
			color: #eb6c6c;
		}
	}
	.right {
		display: flex;
		gap: 7px;
		.icon-wrapper {
			padding: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			img {
				width: 11px;
			}

			&.edit {
				border: 1px solid #ddd;
				border-radius: 4px;
			}
		}
		.icon-group {
			display: flex;
			border: 1px solid #ddd;
			border-radius: 4px;

			div:first-child {
				border-right: 1px solid #ddd;
			}
		}
	}
`;

type TaskFormProps = {
	task: TaskModel;
	handleShowEditForm: () => void;
}

const Task = ({ task, handleShowEditForm }: TaskFormProps) => {
	const [showEditIcon, setShowEditIcon] = useState(false);

	return (
		<Container
			onMouseEnter={() => setShowEditIcon(true)}
			onMouseLeave={() => setShowEditIcon(false)}
		>
			<div className="left">
				<div className="avatar">
					<img
						src="http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png"
						alt="user avatar"
					/>
				</div>
				<div>
					<p className="message">{task.task_msg}</p>
					<p className="date">
						{format(new Date(task.task_date), "MM/dd/yyyy")}
					</p>
				</div>
			</div>
			<div className="right">
				{showEditIcon && (
					<div onClick={handleShowEditForm} className="icon-wrapper edit">
						<img src={editIcon} alt="edit icon" />
					</div>
				)}
				<div className="icon-group">
					<div className="icon-wrapper">
						<img src={snoozeIcon} alt="snooze icon" />
					</div>
					<div className="icon-wrapper">
						<img src={tickIcon} alt="tick icon" />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Task;
