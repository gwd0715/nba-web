import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import DataViewContainer from './DataViewContainer';

const MainBody = () => {
	console.log('main body');
	const [playerInfo, setPlayerInfo] = useState({
		playerId: 201939,
		playerName: 'Stephen Curry'
	});

	useEffect(() => {
		window.nba = nba;
		nba.stats
			.playerInfo({
				PlayerID: nba.findPlayer(playerInfo.playerName).playerId
			})
			.then(info => {
				const playInfo = Object.assign(
					info.commonPlayerInfo[0],
					info.playerHeadlineStats[0]
				);
				console.log(playInfo);
				setPlayerInfo(playInfo);
			})
			.catch(e => console.log(e));
	}, [playerInfo.playerName]);

	return (
		<div className="main">
			<Profile playerInfo={playerInfo} />
			<DataViewContainer playerId={playerInfo.playerId} />
		</div>
	);
};

export default MainBody;
