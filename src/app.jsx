import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Layout from "./components/layout";
import Loader from "./components/loader";

import { loginUser } from "./redux/slices/userSlice";

import "./ReactToastify.css";

const App = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.user);

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
