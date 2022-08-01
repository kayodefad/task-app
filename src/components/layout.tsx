import styled from 'styled-components';
import Tasks from './tasks';

import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';

const Container = styled.div`
	display: flex;
	height: 100vh;
	background: #fafafa;
`;
const Sidebar = styled.div`
	height: 100%;
	background: #323e4d;
	width: 230px;

	@media (max-width: 576px) {
		width: 0;
	}
`;
const Main = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Header = styled.header`
	height: 50px;
	background: #f9f9f9;
	box-shadow: 0 4px 20px -10px gray;
`;
const TasksContainer = styled.div`
	flex: 1;
	margin-top: 15vh;
	margin-left: 20px;
`;

const Layout = () => {
	const { error: userError } = useAppSelector((state) => state.user);
	const { error: taskError } = useAppSelector((state) => state.task);

	useEffect(() => {
		if (userError) {
			toast.error(userError);
		}
	}, [userError]);

	useEffect(() => {
		if (taskError) {
			toast.error(taskError);
		}
	}, [taskError]);

	return (
		<Container>
			<Sidebar />
			<Main>
				<Header />
				<TasksContainer>
					<Tasks />
				</TasksContainer>
			</Main>
		</Container>
	);
};

export default Layout;
