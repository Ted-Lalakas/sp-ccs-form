
export const getSubjectArrayData = (fullArray:any[]) => {
	// Get the trimmed data and reduce it to unique values to be used in the next bit
	const subjectTitleAll = [...fullArray.map(x => x.subject)];
	const subjectUnique = subjectTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

	return subjectUnique;
};

export const getOptionArrayData = (fullArray:any[], selectOption:string) => {
	// Get the first element and pass it some extra values
	const regionDetailsData = fullArray.filter( n => n.subject == "Region Details" );

	// Get the trimmed data and reduce it to unique values to be used in the next bit
	const regionTitleAll = [...regionDetailsData.map(x => x.Title)];
	// const regionUnique = regionTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

	// Creates a final (re-formatted) array of values ready for use
	// Returns this value to be stored as a variable in the main script

	// const formattedArray = [];
	// regionUnique.forEach( value => {
	// 	const currentRegion = value;
	// 	const iterationArray = regionDetailsData.filter( n => n.Title == value );
	// 	formattedArray.push( {
	// 	regions: currentRegion,
	// 	subRegions: iterationArray}
	// 	);
	// });
	// return formattedArray;
	return regionTitleAll;
};