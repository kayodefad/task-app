import React, { forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../assets/icons/calendar-icon.png";

const Input = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const FormDatePicker = ({ date, handleChange }) => {
	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<Input onClick={onClick} ref={ref}>
			<img style={{ width: 13 }} src={calendarIcon} alt="calendar icon" />
			<span>{value}</span>
		</Input>
	));

	return (
		<DatePicker
			selected={date}
			onChange={handleChange}
			popperClassName="some-custom-class"
			popperPlacement="top"
			popperModifiers={[
				{
					name: "offset",
					options: {
						offset: [48, 0],
					},
				},
				{
					name: "preventOverflow",
					options: {
						rootBoundary: "viewport",
						tether: false,
						altAxis: true,
					},
				},
			]}
			customInput={<CustomInput />}
		/>
	);
};

export default FormDatePicker;
