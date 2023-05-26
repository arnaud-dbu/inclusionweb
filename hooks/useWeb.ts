export const getData = async (id) => {
	const res = await fetch(`http://localhost:3000/api/web/${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const x = res.json();

	return x;
};
