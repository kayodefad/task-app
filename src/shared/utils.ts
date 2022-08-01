export const getTimeList = () => {
	const minutes = 24 * 60;

	const times: { [key: string]: number } = {};

	for (let i = 0; i < minutes; i += 30) {
		const time = i;
		let min = Math.floor(time / 60);
		const sec = Math.floor(time - min * 60);
		const period = min < 12 ? 'am' : 'pm';
		min = min > 12 ? min % 12 : min;
		times[`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}${period}`] =
			i * 60;
	}
	return times;
};

export const getKeyByValue = (
	object: { [key: string]: number },
	value: number
) => {
	return Object.keys(object).find((key) => object[key] === value);
};
