import $ from 'jquery';
import React, { cloneElement } from 'react';
require('Select2');

export default React.createClass({
  runSelect2(data=this.props.select2Data) {
    if (data === undefined) {
      data = {};
    }
    let elem = $(React.findDOMNode(this));
    this._select2 = elem.select2(data);
    $(elem).on('change', (e) => {
      if (this.props.onChange) {
        this.props.onChange.apply(null, [e, $(elem).select2('data'), $(elem).val()]);
      }
    });
  },

  componentDidMount() {
    this.runSelect2();
  },

  componentDidUpdate() {
    this.runSelect2();
  },
  componentWillUpdate() {
    let elem = $(React.findDOMNode(this));
    // Dirty hack, remove new options that was added in DOM by select2
    elem.find('option:not([data-reactid])').remove();
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.select2Data !== nextProps.select2Data);
  },

  componentWillUnmount: function(){
    this._select2.select2('destroy');
  },

  render() {
    return this.props.children;
  }
});
