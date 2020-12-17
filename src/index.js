const utils = require('./utils');

const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO8601_DATE_PATTERN = "^([\\+-]?\\d{4}(?!\\d{2}\\b))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))?)$";
const ISO8601_DATE_TIME_PATTERN = "^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z)$";
const ISO8601_DATE_TIME_MS_PATTERN = "^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d(:?[0-5]\\d)?|Z)$";
const RFC3339_TIMESTAMP_PATTERN = /^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([\+|\-]([01]\d|2[0-3])))$/;

function like(value) {
  return {
    value,
    pactum_type: 'LIKE'
  };
}

function eachLike(content, options) {
  let min = 1;
  let value = [content];
  if (typeof options === 'object') {
    if (options.value) {
      value = options.value;
    }
    if (typeof options.min === 'number') {
      min = options.min;
    }
  }
  return {
    value,
    min,
    pactum_type: 'ARRAY_LIKE'
  };
}

function oneOf(value) {
  return {
    value,
    pactum_type: 'ONE_OF'
  };
}

function expression(value, expr) {
  return {
    value,
    expr,
    pactum_type: 'EXPR'
  };
}

function regex(value, matcher) {
  if (matcher instanceof RegExp) {
    matcher = matcher.source;
  }
  try {
    new RegExp(matcher);
  } catch (error) {
    throw 'Invalid RegEx Matcher';
  }
  return {
    value,
    matcher,
    pactum_type: 'REGEX'
  };
}

function includes(value) {
  return regex({
    value,
    matcher: value
  });
}

function email(value) {
  return regex({
    value: value || 'hello@pactum.js',
    matcher: EMAIL_PATTERN
  });
}

function uuid(value) {
  return regex({
    value: value || 'ce118b6e-d8e1-11e7-9296-cec278b6b50a',
    matcher: UUID_PATTERN
  });
}

function date(value) {
  return regex({
    value: value || '2020-12-12',
    matcher: ISO8601_DATE_PATTERN
  });
}

function dateTime(value) {
  return regex({
    value: value || '2020-12-12T16:53:10+01:00',
    matcher: ISO8601_DATE_TIME_PATTERN
  });
}

function dateTimeMs(value) {
  return regex({
    value: value || '2020-12-12T16:53:10+01:00',
    matcher: ISO8601_DATE_TIME_MS_PATTERN
  });
}

function timestamp(value) {
  return regex({
    value: value || '2020-12-12 16:41:41.090Z',
    matcher: RFC3339_TIMESTAMP_PATTERN
  });
}

module.exports = {
  like,
  eachLike,
  oneOf,
  expression,
  regex,
  includes,
  email,
  uuid,
  date,
  dateTime,
  dateTimeMs,
  timestamp,
  utils
};