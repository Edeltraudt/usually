import * as helpers from './helpers';

export class Store {
  localStorage = window.localStorage;
  day = new Date();

  set user(user) {
    console.log('Set user to', user);
    this.localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    return helpers.parseJSON(this.localStorage.getItem('user'));
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

  get history() {
    return helpers.getItem('history');
  }

  set history(history) {
    return helpers.setItem('history', history);
  }

  get today() {
    return helpers.getItem('today');
  }

  set today(today) {
    return helpers.setItem('today', today);
  }

  saveFieldValue(cardId, fieldId, value) {
    const activeDay = helpers.formatDate(this.day);

    if (activeDay === helpers.formatDate(new Date())) {
      this.saveFieldValueForToday(cardId, fieldId, value);
    } else {
      this.saveFieldValueForDay(activeDay, cardId, fieldId, value);
    }
  }

  getFieldValue(cardId, fieldId) {
    if (this.day === helpers.formatDate(new Date())) {
      this.getFieldValueForToday(cardId, fieldId);
    } else {
      this.getFieldValueForDay(this.day, cardId, fieldId);
    }
  }

  saveFieldValueForToday(cardId, fieldId, value) {
    let today = this.today || { date: new Date() };

    if (!today[cardId]) today[cardId] = {};

    today[cardId][fieldId] = value;

    this.today = today;
  }

  getFieldValueForToday(cardId, fieldId) {
    const today = this.today;

    if (today[cardId]) return today[cardId][fieldId];

    return null;
  }

  saveFieldValueForDay(date, cardId, fieldId, value) {
    const { history, index, day } = this.getDay(date);

    if (!day[cardId]) day[cardId] = {};

    day[cardId][fieldId] = value;
    history[index] = day;

    this.history = history;
  }

  getFieldValueForDay(date, cardId, fieldId) {
    const { day } = this.getDay(date);

    if (day[cardId]) return day[cardId][fieldId];

    return null;
  }

  getDay(date) {
    let history = this.history;
    let index = history.findIndex(day => day.date === helpers.formatDate(date));
    let day = history[index] || { date };

    return { history, index, day }
  }
}
