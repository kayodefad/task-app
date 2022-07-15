import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../services/instance";

const companyId = "company_413ef22b6237417fb1fba7917f0f69e7";

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (loginDetails, { rejectWithValue }) => {
		try {
			const { data } = await instance.post("/login", loginDetails);
			localStorage.setItem("user", JSON.stringify(data.results));
			return data.results;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while logging in");
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUsers = createAsyncThunk(
	"user/getUsers",
	async (fetch = true, { rejectWithValue }) => {
		try {
			const { data } = await instance.get(
				`/team?product=outreach&company_id=${companyId}`
			);
			return data.results.data;
		} catch (error) {
			if (!error.response) {
				toast.error("Network Error");
				return;
			}
			toast.error("An error occurred while getting users");
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	user: null,
	loading: false,
	error: "",
	users: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.loading = false;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
