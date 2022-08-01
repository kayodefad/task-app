import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import instance from '../../../services/instance';

const companyId = 'company_413ef22b6237417fb1fba7917f0f69e7';
const urlStart = '/task/lead_465c14d0e99e4972b6b21ffecf3dd691';

export type TaskModel = {
	company_id?: string;
	user_id?: string;
	id: string;
	assigned_user: string;
	task_date: string;
	task_time: number;
	is_completed: number;
	time_zone: number;
	task_msg: string;
	user_icon?: string;
};

type UpdateTaskModel = Omit<TaskModel, 'id'>;

export const getAllTasks = createAsyncThunk(
	'task/getAllTasks',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instance.get(
				`${urlStart}?company_id=${companyId}`
			);
			return data.results;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getSingleTask = createAsyncThunk(
	'task/getSingleTask',
	async (taskId: string, { rejectWithValue }) => {
		try {
			const { data } = await instance.get(
				`${urlStart}/${taskId}?company_id=${companyId}`
			);
			return data.results;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addTask = createAsyncThunk(
	'task/addTask',
	async (task: UpdateTaskModel, { rejectWithValue }) => {
		try {
			const { data } = await instance.post(
				`${urlStart}?company_id=${companyId}`,
				task
			);
			toast.success('Task Added successfully');
			return data.results;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateTask = createAsyncThunk(
	'task/updateTask',
	async (
		task: { id: string; updatedTask: UpdateTaskModel },
		{ rejectWithValue }
	) => {
		try {
			const { data } = await instance.put(
				`${urlStart}/${task.id}?company_id=${companyId}`,
				task.updatedTask
			);
			toast.success('Task Updated successfully');
			return data.results;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteTask = createAsyncThunk(
	'task/deleteTask',
	async (taskId: string, { rejectWithValue }) => {
		try {
			await instance.delete(`${urlStart}/${taskId}?company_id=${companyId}`);
			toast.success('Task Deleted successfully');
			return taskId;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

type TaskState = {
	tasks: TaskModel[];
	loading: boolean;
	error: string;
	task: TaskModel | null;
};

const initialState: TaskState = {
	tasks: [],
	loading: false,
	error: '',
	task: null,
};

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				getAllTasks.fulfilled,
				(state, action: PayloadAction<TaskModel[]>) => {
					state.tasks = action.payload;
					state.loading = false;
				}
			)
			.addCase(getAllTasks.rejected, (state, action) => {
				state.error = 'An error occurred';
				state.loading = false;
			})
			.addCase(addTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTask.fulfilled, (state, action: PayloadAction<TaskModel>) => {
				state.tasks.push(action.payload);
				state.loading = false;
			})
			.addCase(addTask.rejected, (state, action) => {
				state.error = 'An error occurred';
				state.loading = false;
			})
			.addCase(getSingleTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				getSingleTask.fulfilled,
				(state, action: PayloadAction<TaskModel>) => {
					state.task = action.payload;
					state.loading = false;
				}
			)
			.addCase(getSingleTask.rejected, (state, action) => {
				state.error = 'An error occurred';
				state.loading = false;
			})
			.addCase(updateTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				updateTask.fulfilled,
				(state, action: PayloadAction<TaskModel>) => {
					const existingTaskIndex = state.tasks.findIndex(
						(task) => task.id === action.payload.id
					);
					state.tasks[existingTaskIndex] = action.payload;
					state.loading = false;
				}
			)
			.addCase(updateTask.rejected, (state, action) => {
				state.error = 'An error occurred';
				state.loading = false;
			})
			.addCase(deleteTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter((task) => task.id !== action.payload);
				state.loading = false;
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.error = 'An error occurred';
				state.loading = false;
			});
	},
});

export default taskSlice.reducer;
