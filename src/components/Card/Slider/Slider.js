import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Slider.scss';

export const SliderType = {
  PROGRESS: 0,
  MULTI: 1
}

export class Slider extends Component {
  static propTypes = {
    type: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: SliderType.PROGRESS,
    min: 0,
    max: 100,
    value: 0,
    step: 1
  };

  constructor(props) {
    super(props);

    this.lineRef = React.createRef();
    this.type = props.type;
    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({ value: props.value });
    }
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  get percentage() {
    const percentage = (this.state.value / this.props.max);
    return percentage > 1 ? 1 : percentage;
  }

  render() {
    const { min, max, step } = this.props;

    return (
      <div className="slider">
        <div className="slider-mirror" aria-hidden="true">
          <div className="slider-line">
            <span className="slider-line-fill"
                style={{ transform: `scaleX(${this.percentage})` }} />
          </div>
          <div className="slider-mirror-wrap">
            <div className="slider-thumb-position"
                style={{ transform: `translateX(${this.percentage * 100 + '%'})` }}>
              <div className="slider-thumb-wrap">
                <span className="slider-thumb" />
              </div>
            </div>
          </div>
        </div>
        <input type="range" className="slider-input"
            min={min} max={max} step={step}
            value={this.state.value}
            onChange={this.onChange} />
      </div>
    );
  }
}
