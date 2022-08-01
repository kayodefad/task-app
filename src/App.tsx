import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import Layout from "./components/layout";
import Loader from "./components/loader";

import { loginUser } from './redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import "./ReactToastify.css";

const App = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(
			loginUser({
				email: "smithwills1989@gmail.com",
				password: "12345678",
			})
		);
	}, []);

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1500}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			{loading && <Loader />}
			<Layout />
		</>
	);
};

export default App;
