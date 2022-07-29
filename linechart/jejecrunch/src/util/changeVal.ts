const init: [number, number][] = [];

export default function changeVal(d: { date: Date | null; value: number }[]) {
	const result = d?.reduce((prev, cur: { date: Date | null; value: number }) => {
		if (cur.date) prev.push([cur.date?.getTime(), cur.value]);
		else prev.push([new Date().getTime(), cur.value]);
		return prev;
	}, init);

	return result.slice(0, d.length - 1);
}
