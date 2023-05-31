export const getWebs = async () => {
	const res = await fetch(`${process.env.HOST}/api/webs`, {
		cache: "no-cache",
	});
	const data = await res.json();
	return data;
};
