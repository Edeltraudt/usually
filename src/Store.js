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
}
