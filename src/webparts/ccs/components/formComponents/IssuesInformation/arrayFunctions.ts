
export const getSubjectArrayData = (fullArray:any[]) => {
	// Get the trimmed data and reduce it to unique values to be used in the next bit
	const subjectTitleAll = [...fullArray.map(x => x.subject)];
	const subjectUnique = subjectTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

	return subjectUnique;
};