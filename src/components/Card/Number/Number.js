import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import TimeField from 'react-simple-timefield';

import * as helpers from '../../../helpers';

import './Number.scss';

export class Number extends Component {
  static propTypes = {
    label: PropTypes.string,
    showLabel: PropTypes.bool,
    value: PropTypes.any.isRequired,
    unit: PropTypes.string,
    info: PropTypes.string,
    quickActions: PropTypes.array
  };

  static defaultProps = {
    showLabel: false
  };

  constructor(props) {
    super(props);

    let value = props.value.toString() || 0;
    let ampm = 'am';

    if (this.props.unit === 'datetime') {
      let [hours, minutes] = value.split(':');
      let [h, mod] = helpers.convertAmPm(hours);
      value = `${h}:${minutes}`;
      ampm = mod;
    }

    this.inputRef = React.createRef();
    this.state = {
      value: value || 0,
      internalValue: props.value.toString(),
      timeout: null
    };

    if (this.props.unit === 'datetime') {
      this.state.timeUnit = ampm;
    }
  }

  convertTime(timeArray) {
    let hours = 0,
        minutes = 0;
    let ampm = 'am';

    // time given in minutes
    if (timeArray.length === 1) {
      minutes = timeArray[0] % 60;
      hours = (timeArray[0] - minutes) / 60;

    // time given in hours, minutes
    } else if (timeArray.length === 2) {
      [hours, minutes] = timeArray;
    // invalid format
    } else {
      console.error('Invalid time array', timeArray);
    }

    if (hours >= 12) ampm = 'pm';
    if (hours === 0) hours = 12;

    hours = hours % 12;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    this.setState({timeUnit: ampm});

    return hours + ':' + minutes;
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange = (event) => {
    if (this.state.timeout) window.clearTimeout(this.state.timeout);

    let value = event;

    if (event.persist) event.persist();
    if (event.target) value = event.target.value.toString();;

    if (this.props.unit === 'time' || this.props.unit === 'datetime') {
      this.handleTimeChange(value);
    } else {
      value = parseInt(event.target.value);
    }

    this.setState({ value });

    if (this.props.onChange) {
      this.setState({
        timeout: window.setTimeout(() => {
          if (this.state.internalValue) {
            this.props.onChange(this.state.internalValue);
          } else this.props.onChange(this.state.value);

          this.setState({ timeout: null });
        }, 200)
      });
    }
  }

  handleTimeChange = (value) => {
    let [hours, minutes] = value.split(':');
    hours = helpers.convertTo24Hours(hours, this.state.timeUnit);
    this.setState({internalValue: `${hours}:${minutes}`});
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.props.onChange) {
        if (this.state.internalValue) {
          this.props.onChange(this.state.internalValue);
        } else this.props.onChange(this.state.value);
      }

      if (this.props.unit === 'time' || this.props.unit === 'datetime') {
        this.handleTimeChange(this.state.value);
      }

      // autosize input case
      if (this.inputRef.input) this.inputRef.input.blur()

      // regular input
      if (this.inputRef.blur) this.inputRef.blur();
    }
  }

  handleUnitClick = (event) => {
    if (this.state.timeUnit) {
      const date = new Date(this.state.internalValue);
      const minutes = date.getMinutes();
      const [hours, ampm] =
        helpers.convertAmPm(date.getHours(), this.state.timeUnit);
      const value = `${hours}:${minutes}`;
      const internalValue = `${helpers.convertTo24Hours(hours)}:${minutes}`;

      date.setHours(helpers.convertTo24Hours(hours, ampm));
      this.setState({ value, internalValue, timeUnit: ampm });
    }
  }

  renderDefaultInput() {
    return <AutosizeInput
      type="text"
      onChange={this.handleChange}
      onKeyPress={this.handleKeyPress}
      value={this.state.value}
      style={{ fontSize: 30 }}
      ref={(input) => this.inputRef = input}
      className='card-number-input'
    />
  }

  renderInput() {
    switch (this.props.unit) {
      case 'datetime':
        // falls through
      case 'time':
        return <TimeField
          input={this.renderDefaultInput()}
          value={this.state.value}
          onChange={this.handleChange}
        />

      case 'number':
        // falls through
      case 'text':
        // falls through
      default:
        return this.renderDefaultInput();
    }
  }

  render() {
    return (
      <div className="card-number">
        <span aria-label={this.props.label} className="card-section-heading">
          {(this.props.showLabel) && this.props.label}
        </span>
        <div className="card-number-wrap">
          <div className="card-value">
            {this.renderInput()}
            <span className={"unit" + (this.state.timeUnit ? " -toggle" : "")}
                onClick={this.handleUnitClick}>
              {this.props.unit === 'time' ? 'h' :
                (this.state.timeUnit ? this.state.timeUnit : this.props.unit)}
            </span>
          </div>

          {this.props.quickActions &&
            <div className="card-number-actions">
              {this.props.quickActions.map((quickAction, index) =>
                <button className="card-number-action" key={index}>
                  <quickAction.icon />
                </button> )}
            </div>}
        </div>

        {this.props.info &&
          <p className="card-info">{this.props.info}</p>}
      </div>
    );
  }
}
