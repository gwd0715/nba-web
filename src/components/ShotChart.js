import React, { useEffect } from 'react';
import nba from '../nba-client';
import * as d3 from 'd3';
import { court, shots } from 'd3-shotchart';
import { hexbin } from 'd3-hexbin';

window.d3_hexbin = { hexbin: hexbin };

const ShotChart = props => {
	useEffect(() => {
		nba.stats
			.shots({ PlayerID: props.playerId })
			.then(res => {
				const final_shots = res.shot_Chart_Detail.map(shot => {
					return {
						x: (shot.locX + 250) / 10,
						y: (shot.locY + 50) / 10,
						action_type: shot.actionType,
						shot_distance: shot.shotDistance,
						shot_made_flag: shot.shotMadeFlag
					};
				});
				const courtSelection = d3.select('#shot-chart');
				courtSelection.html('');
				const chart_court = court().width(500);
				const chart_shots = shots()
					.shotRenderThreshold(props.minCount)
					.displayToolTips(props.displayTooltip)
					.displayType(props.chartType);
				courtSelection.call(chart_court);
				courtSelection.datum(final_shots).call(chart_shots);
			})
			.catch(e => console.log(e));
	}, [props.chartType, props.displayTooltip, props.minCount, props.playerId]);
	return <div id="shot-chart"></div>;
};

export default ShotChart;
