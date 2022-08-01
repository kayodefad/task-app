import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../services/instance';

const companyId = 'company_413ef22b6237417fb1fba7917f0f69e7';

type User = {
	id: string;
	name: string;
};

type LoggedInUser = {
	want_login: string;
	token: string;
	is_first: number;
	icon: string;
	by_default: string;
	company_id: string;
	user_id: string;
	status: string;
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (loginDetails: { email: string; password: string }) => {
		const { data } = await instance.post('/login', loginDetails);
		localStorage.setItem('user', JSON.stringify(data.results));
		return data.results;
	}
);

export const getUsers = createAsyncThunk('user/getUsers', async () => {
	const { data } = await instance.get(
		`/team?product=outreach&company_id=${companyId}`
	);
	return data.results.data;
});

type UserState = {
	user: LoggedInUser | null;
	loading: boolean;
	error: string;
	users: User[];
};

const initialState: UserState = {
	user: null,
	loading: false,
	error: '',
	users: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.error = '';
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.error.message || 'An error occurred';
				state.loading = false;
			})
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.loading = false;
				state.error = '';
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.error = action.error.message || 'An error occurred';
				state.loading = false;
			});
	},
});

export default userSlice.reducer;
