import React, { Component } from 'react';
import { SmileySad, SmileyHappy } from './../../../asset/icons';

import './Rating.scss';

export const RatingOptions = {
  BAD: 'Bad',
  OK: 'Ok',
  GOOD: 'Good'
}

export class Rating extends Component {
  options = [
    { label: RatingOptions.BAD, icon: SmileySad },
    { label: RatingOptions.OK, icon: null },
    { label: RatingOptions.GOOD, icon: SmileyHappy }
  ];

  constructor(props) {
    super(props);

    this.state = {
      selection: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.selected) {
      this.setState({ selection: props.selected });
    }
  }

  handleChange = (selection) => {
    if (this.state.selection !== selection) {
      this.setState({selection});

      if (this.props.onChange) this.props.onChange(selection);
    }
  }

  render() {
    const parentCls = this.state.selection ? ' -selected' : '';
    const activeCls = ' -active';

    return (
      <div className={"card-rating" + parentCls}>
        {this.props.label && <>
          {this.props.showLabel
            ? <h4 className="card-section-heading">{this.props.label}</h4>
            : <span aria-label={this.props.label} />}
        </>}
        <div className="card-rating-wrap">
          <div className="card-rating-slider"></div>

          {this.options.map((option, index) => {
            const isActive = this.state.selection === option.label;
            const isActiveCls = isActive ? activeCls : '';
            const cls = option.label.toLowerCase() + isActiveCls;

            return (<button className={"card-rating-checkpoint -" + cls}
              aria-label={option.label}
              onClick={() => this.handleChange(option.label)}
              key={index}>
              <span className="card-rating-checkpoint-circle"></span>
              {option.icon && <option.icon />}
            </button>);
          }
          )}
        </div>
      </div>
    );
  }
}
