import React from 'react';

const monthNames = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

export function formatDate(date) {
  return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
}

export function printDate(date) {
  return monthNames[date.getMonth()] + ' ' + date.getDate();
}

export function printGreeting(date) {
  const time = date.getHours();

  if (time > 17) {
    return 'Good evening';
  } else if (time > 14) {
    return 'Good afternoon';
  } else if (time > 12) {
    return 'Hello';
  } else {
    return 'Good morning';
  }
}

export function printValue(value, unit) {
  if (unit === 'time') {
    return getTimespanAsValue(value);
  } else if (unit === 'datetime') {
    return getTimeAsValue(value);
  } else {
    return getNumberAsValue(value, unit);
  }
}

export function getTimespanAsValue(minutes) {
  const mins = minutes % 60;
  const hours = (minutes - mins) / 60;

  return (<>
    {hours}<span className="unit">h</span>
    {mins}<span className="unit">m</span>
  </>)
}

export function getTimeAsValue(date) {
  let hours = date.getHours() % 12;
  let minutes = date.getMinutes();
  let ampm = 'am';

  if (date.getHours() >= 12) ampm = 'pm';
  if (hours === 0) hours = 12;

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return (<>
    {hours}:{minutes}<span className="unit">{ampm}</span>
  </>)
}

export function getNumberAsValue(number, unit) {
  return (<>
    {Number(number).toLocaleString()}<span className="unit">{unit}</span>
  </>)
}

export function parseJSON(string) {
  if (string && string !== undefined && string !== 'undefined') {
    return JSON.parse(string);
  } else {
    return null;
  }
}
