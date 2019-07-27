import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import * as helpers from '../../../helpers';

import './Number.scss';

import { Datetime } from './Datetime';
import { Time } from './Time';
import { Slider } from '../Slider';

export class Number extends Component {
  static propTypes = {
    label: PropTypes.string,
    showLabel: PropTypes.bool,
    value: PropTypes.any,
    unit: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func,
    quickActions: PropTypes.array,
    data: PropTypes.any
  };

  static defaultProps = {
    showLabel: false,
    value: 0
  };

  constructor(props) {
    super(props);

    let value = props.value || 0;

    this.inputRef = React.createRef();
    this.state = { value, timeout: null };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange = (event) => {
    if (this.state.timeout) window.clearTimeout(this.state.timeout);

    let value = event;

    if (event.persist) event.persist();
    if (event.target) value = event.target.value;

    if (this.props.unit === 'datetime' || !isNaN(value)) {
      this.setState({ value });

      // pass updated value upwards with a delay
      if (this.props.onChange) {
        this.setState({
          timeout: window.setTimeout(() => {
            this.props.onChange(value);
            this.setState({ timeout: null });
          }, 200)
        });
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }

      // autosize input case
      if (this.inputRef.input) this.inputRef.input.blur();

      // regular input
      if (this.inputRef.blur) this.inputRef.blur();
    }
  }

  handleQuickAction = (operator, amount) => {
    this.setState({
      value: helpers.calculate(operator, this.state.value, amount)
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
  }

  renderInput() {
    const sharedProps = {
      style: { fontSize: 30 },
      value: this.state.value,
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
      className: 'card-number-input'
    }

    switch (this.props.unit) {
      case 'time':
        return <Time {...sharedProps} />;
      case 'datetime':
        return <Datetime {...sharedProps} />;
      default:
        return <AutosizeInput {...sharedProps}
          type="text"
          ref={(input) => this.inputRef = input}
        />;
    }
  }

  render() {
    return (<>
      <Slider />
      <div className="card-number">
        <span aria-label={this.props.label} className="card-section-heading">
          {(this.props.showLabel) && this.props.label}
        </span>
        <div className="card-number-wrap">
          <div className="card-value">
            {this.renderInput()}
            {(this.props.unit && this.props.unit !== 'time' && this.props.unit !== 'datetime') &&
              <span className="unit">{this.props.unit}</span>}
          </div>

          {this.props.quickActions &&
            <div className="card-number-actions">
              {this.props.quickActions.map((quickAction, index) =>
                <button className="card-number-action"
                    onClick={() => this.handleQuickAction(quickAction.operator, quickAction.amount)}
                    key={index}>
                  <quickAction.icon />
                </button> )}
            </div>}
        </div>

        {this.props.info &&
          <p className="card-info">{this.props.info}</p>}
      </div>
    </>);
  }
}
