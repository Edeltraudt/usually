import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RangeInput.scss';

export class RangeInput extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    min: 1,
    step: 1
  };

  constructor(props) {
    super(props);

    this.state = {
      value: (props.min + props.max) / 2
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const { min, max, step, minLabel, maxLabel } = this.props;
    const steps = (max - min) / step / 2 + 1;

    return (
      <div className="range-wrap">
        <div className="range">
          <div className="range-helper">
            {[...Array(steps)].map((e, i) => <span className="range-dot" key={i} />)}
          </div>
          <input type="range" className="range-input"
              value={this.state.value}
              min={min}
              max={max}
              step={step}
              onChange={this.handleChange}
            />
        </div>

        <div className="range-labels">
          <p className="range-label">{minLabel}</p>
          <span className="visually-hidden">to</span>
          <p className="range-label">{maxLabel}</p>
        </div>
      </div>
    )
  }
}
