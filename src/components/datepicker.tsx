import React, { forwardRef, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../assets/icons/calendar-icon.png';

const Input = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

type FormDatePickerProps = {
	date: Date;
	handleChange: (date: Date) => void;
};

const FormDatePicker = ({ date, handleChange }: FormDatePickerProps) => {
	const inputRef = useRef(null);

	const CustomInput = forwardRef(
		(props: any, ref: React.ForwardedRef<HTMLDivElement>) => (
			<Input onClick={props.onClick} ref={ref}>
				<img style={{ width: 13 }} src={calendarIcon} alt="calendar icon" />
				<span>{props.value}</span>
			</Input>
		)
	);

	return (
		<DatePicker
			selected={date}
			onChange={handleChange}
			popperClassName="some-custom-class"
			popperPlacement="top"
			popperModifiers={[
				{
					name: 'offset',
					options: {
						offset: [48, 0],
					},
				},
				{
					name: 'preventOverflow',
					options: {
						rootBoundary: 'viewport',
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
