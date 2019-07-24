export class Card {
  key = '';
  label = '';
  unit = '';
  icon = null;
  fields = [];

  constructor(key, label, unit, icon) {
    this.key = key;
    this.label = label;
    this.unit = unit;
    this.icon = icon;
  }

  createField(component, key, props) {
    this.fields.push(new CardField(component, key, props));
  }

  addField(field) {
    if (field instanceof CardField) {
      this.fields.push(field);
    } else {
      console.error(`Invalid field ${field}.`)
    }
  }

  addFields(fields) {
    this.fields.push(...fields);
  }
}

export class CardField {
  component;
  key = '';
  props = {};

  constructor(cmp, key, props) {
    this.component = cmp;
    this.key = key;

    if (props) {
      this.props = props;
    }
  }
}
