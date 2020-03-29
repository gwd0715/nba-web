import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const CounterSlider = props => {
  const [inputValue, setInputValue] = useState(props.value);

  const onChange = value => {
    const cleanValue = Number(value) ? value : inputValue;
    setInputValue(cleanValue);
    props.onCountSliderChange(cleanValue);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider min={1} max={20} onChange={onChange} value={inputValue} />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ marginLeft: 16 }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default CounterSlider;
