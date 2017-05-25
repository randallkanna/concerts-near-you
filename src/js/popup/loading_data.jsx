import React from 'react';

const LoadingData = ({ artist, range }) => {
	const rangeAlert = (range === '-1' ? "around the world!" : `within ${range} miles around you.`);
	return (<div>Looking for {artist} concerts {rangeAlert} </div>);
}

export default LoadingData;