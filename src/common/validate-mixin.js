import React from 'react';

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let validateHelper = {
  required(value, name) {
    if (value) {
      return false;
    } else {
      return capitalizeFirstLetter(name) + " field is required";
    }
  }
};

export default {
  validate(fields=this.state.fields) {
    let errors = this.state.errors;

    for (let [key, value] of Object.entries(fields)) {
      let fieldValue = React.findDOMNode(this.refs[key]).value;
      for (let validateType of value) {
        let validateResult = validateHelper[validateType](fieldValue, key);
        if (validateResult) {
          errors[key] = validateResult;
        } else {
          delete errors[key];
        }
      }
    }

    return {errors: errors};
  },

  getData(fields=this.state.fields) {
    let data = {};
    for (let [key, value] of Object.entries(fields)) {
      let fieldValue = React.findDOMNode(this.refs[key]).value;
      data[key] = fieldValue;
    }

    return data;
  }
};
