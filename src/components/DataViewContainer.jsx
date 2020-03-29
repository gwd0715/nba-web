import React, { useState } from 'react';
import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider';
import _ from 'lodash';
import { Radio, Row, Col, Switch } from 'antd';

const DataViewContainer = props => {
  const [minCount, setMinCount] = useState(2);
  const [chartType, setChartType] = useState('hexbin');
  const [displayTooltip, setDisplayTooltip] = useState(true);

  const onCountSliderChange = count => {
    setMinCount(count);
  };

  const onChartTypeChange = e => {
    setChartType(e.target.value);
  };

  const onTooltipChange = displayTooltip => {
    console.log(displayTooltip);
    setDisplayTooltip(displayTooltip);
  };

  return (
    <div className="data-view">
      <ShotChart
        playerId={props.playerId}
        minCount={minCount}
        chartType={chartType}
        displayTooltip={displayTooltip}
      />
      <div className="filters">
        {chartType === 'hexbin' ? (
          <CounterSlider
            value={minCount}
            onCountSliderChange={_.debounce(onCountSliderChange, 500)}
          />
        ) : null}
        <br />
        <Row>
          <Col span={9}>
            <Radio.Group onChange={onChartTypeChange} value={chartType}>
              <Radio value="hexbin">Hexbin</Radio>
              <Radio value="scatter">Scatter</Radio>
            </Radio.Group>
          </Col>
          <Col span={4}>
            <Switch
              checkedChildren="On"
              unCheckedChildren="Off"
              onChange={onTooltipChange}
              defaultChecked
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DataViewContainer;
