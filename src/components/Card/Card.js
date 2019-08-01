import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

export class Card extends Component {
  static propTypes = {
    getRef: PropTypes.func,
    data: PropTypes.any,
    store: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.key = props.data.key;

    if (props.store) {
      this.data = props.store.getCard(this.props.data.key);
    }
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this.ref);
  }

  handleFieldChange = (value, field) => {
    let saveValue = value;

    if (this.props.store) {
      this.props.store.saveFieldValue(
        this.key,
        field.key,
        saveValue
      );
    }
  }

  getFieldValue = (field) => {
    if (this.data) {
      return this.data[field.key];
    }
    return null;
  }

  getRecommendationFor(card, field, unit) {
    if (this.props.predictor) {
      return this.props.predictor.getRecommendationFor(card, field, unit);
    }
  }

  render() {
    const { label, unit, fields } = this.props.data;

    return (
      <article className="card" ref={this.ref}>
        <div className="card-content" >
          <header className="card-header">
            <span className="card-header-icon">
              <this.props.data.icon />
            </span>
            <h3 className="subheadline card-header-title">{label}</h3>
          </header>

          {fields.map((field, index) =>
            <div className="card-section" key={index}>
              <field.component unit={unit}
                  onChange={value => this.handleFieldChange(value, field)}
                  value={this.getFieldValue(field)}
                  recommendation={this.getRecommendationFor(this.key, field.key, unit)}
                  {...field.props} />
            </div>)}
        </div>
      </article>
    )
  }
}
