import React, { useState } from 'react';
import nba from '../nba-client';
import { AutoComplete, Input } from 'antd';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const SearchBar = props => {
	//set hooks
	const [options, setOptions] = useState([]);

	const handleSearch = name => {
		setOptions(
			!name
				? []
				: nba.searchPlayers(name).map(player => ({
						value: player.fullName,
						label: (
							<div
								key={player.fullName}
								className="player-option">
								<img
									alt="playerPic"
									src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}
									className="player-option-image"
								/>
								<span className="player-option-label">
									{player.fullName}
								</span>
							</div>
						)
				  }))
		);
	};

	const onSelect = name => {
		console.log(name);
		props.handleSelectPlayer(name);
	};

	return (
		<AutoComplete
			className="search-bar"
			onSelect={onSelect}
			onSearch={handleSearch}
			options={options}
			size="large">
			<Input.Search placeholder="Search NBA Player" size="large" />
		</AutoComplete>
	);
};

export default SearchBar;
