import React, { Component } from 'react';

import './Card.scss';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.props.getRef) {
      this.props.getRef(this.ref);
    }
  }

  handleFieldChange = (value, field) => {
    this.props.store.saveFieldValue(
      this.props.data.key,
      field.key,
      value
    );
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
                  {...field.props} />
            </div>)}
        </div>
      </article>
    )
  }
}