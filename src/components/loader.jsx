import loadingSpinner from "../assets/images/loading_spinner.gif";
import styled from "styled-components";

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100vw;
    height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Loader = () => {
	return (
		<Container>
			<img src={loadingSpinner} alt="loading spinner" />
		</Container>
	);
};

export default Loader;
