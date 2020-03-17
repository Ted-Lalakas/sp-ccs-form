
export const getRegionArrayData = (fullArray) => {
    // Get the first element and pass it some extra values
    const regionDetailsData = fullArray.filter( n => n.Type_x0020_of_x0020_Data == "Region Details" );
    console.log(regionDetailsData);

    // Get the List of Region names so that I can use it
    // const getRegionList = [];
    // const map = new Map();
    // for (const item of regionDetailsData) {
    //   if(!map.has(item.Title)){
    //     map.set(item.Title, true);    // set any value to Map
    //     getRegionList.push(item.Title);
    //   }
    // }    
    // console.log(getRegionList);

    //Does same as the script above, just smaller script
    const regionTitleAll = [...regionDetailsData.map(x => x.Title)];
    const regionUnique = regionTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])

    const testArr = [];
    regionUnique.forEach( val => {
        const currentRegion = val;
        const iterationArray = regionDetailsData.filter( n => n.Title == val );
        testArr.push( {
        regions: currentRegion,
        subRegions: iterationArray}
        );
    });
    return testArr;
}

