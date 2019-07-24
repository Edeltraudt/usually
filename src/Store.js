import * as helper from './helpers';

export class Store {
  localStorage = window.localStorage;
  today = new Date();

  set user(user) {
    console.log('Set user to', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    return helper.parseJSON(this.localStorage.getItem('user'));
  }

  get age() {
    return new Date().getFullYear() - this.user.birthYear;
  }

  get nutritionRecommendation() {
    const modifier = this.user.physicalActivity || 1;
    const w = 9.99 * this.user.weight;
    const h = 6.25 * this.user.height;
    const a = 4.92 * this.age;
    let value = w + h - a;

    if (this.user.sex && this.user.sex === 'f') {
      value -= 161;
    } else {
      value += 5;
    }

    return Math.round(value * modifier);
  }

  get hydrationRecommendation() {
    return this.user.weight * 30;
  }

  saveFieldValue(cardId, fieldId, value) {
    console.log('Save value "' + value + '" to', cardId + '.' + fieldId);
  }
}
