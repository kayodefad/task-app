import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../services/instance";

export const getAllTasks = createAsyncThunk(
	"task/getAllTasks",
	async (fetch = true, { rejectWithValue }) => {
		try {
			const { data } = await instance.get(
				"/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7"
			);
			return data.results;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while getting tasks");
			return rejectWithValue(error.response.data);
		}
	}
);

export const getSingleTask = createAsyncThunk(
	"task/getSingleTask",
	async (task, { rejectWithValue }) => {
		try {
			const { data } = await instance.get(
				`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task.id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
			);
			return data.results;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while getting task");
			return rejectWithValue(error.response.data);
		}
	}
);

export const addTask = createAsyncThunk(
	"task/addTask",
	async (task, { rejectWithValue }) => {
		try {
			const { data } = await instance.post(
				"/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7",
				task
			);
			toast.success("Task Added successfully");
			return data.results;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while adding task");
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateTask = createAsyncThunk(
	"task/updateTask",
	async (task, { rejectWithValue }) => {
		try {
			const { data } = await instance.put(
				`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task.id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
				task.updatedTask
			);
			toast.success("Task Updated successfully");
			return data.results;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while updating task");
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteTask = createAsyncThunk(
	"task/deleteTask",
	async (task, { rejectWithValue }) => {
		try {
			await instance.delete(
				`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task.id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
			);
			toast.success("Task Deleted successfully");
			return task.id;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while deleting task");
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	tasks: [],
	loading: false,
	error: "",
	task: null,
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAllTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllTasks.fulfilled, (state, action) => {
				state.tasks = action.payload;
				state.loading = false;
			})
			.addCase(getAllTasks.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(addTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
				state.loading = false;
			})
			.addCase(addTask.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getSingleTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSingleTask.fulfilled, (state, action) => {
				state.task = action.payload;
				state.loading = false;
			})
			.addCase(getSingleTask.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(updateTask.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const existingTaskIndex = state.tasks.findIndex(
					(task) => task.id === action.payload.id
				);
				state.tasks[existingTaskIndex] = action.payload;
				state.loading = false;
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.error = action.payload;
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
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export default taskSlice.reducer;
