import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import TimeField from 'react-simple-timefield';

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

    if (this.props.unit === 'datetime') {
      value = props.value.getHours() + ':' + props.value.getMinutes();
      console.log(props.value.getHours());
    }

    this.inputRef = React.createRef();
    this.state = {
      value: value || 0,
      internalValue: props.value.toString(),
      timeout: null
    };

  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange = (event) => {
    if (this.state.timeout) window.clearTimeout(this.state.timeout);

    let value = event;

    if (event.persist) event.persist();
    if (event.target) value = event.target.value.toString();;

    if (!(this.props.unit === 'time' || this.props.unit === 'datetime')) {
      value = parseInt(event.target.value);
    }

    this.setState({ value });

    if (this.props.onChange) {
      this.setState({
        timeout: window.setTimeout(() => {
          this.props.onChange(value);
          this.setState({ timeout: null });
        }, 200)
      });
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.props.onEnter) {
        this.props.onEnter(this.state.value);
      }

      // autosize input case
      if (this.inputRef.input) this.inputRef.input.blur()

      // regular input
      if (this.inputRef.blur) this.inputRef.blur();
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
            <span className="unit">{this.props.unit}</span>
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
