import $ from 'jquery';
import React from 'react';
import BaseComponent from '../base/component';
import ValidateMixin from '../../common/validate-mixin';
import cx from 'classnames';

let PageComponent = React.createClass({
  mixins: [ValidateMixin],

  getInitialState() {
    return {
      errors: {},
      fields: {
        username: ['required'],
        password: ['required']
      }
    };
  },

  handleChange(event) {
    let validateObj = {};
    let fieldName = event.target.name;

    validateObj[fieldName] = this.state.fields[fieldName];
    let res = this.validate(validateObj);
    this.setState({errors: res.errors});
  },

  handleSubmit(event) {
    event.preventDefault();
    let res = this.validate();

    if (Object.keys(res.errors).length !== 0) {
      this.setState({errors: res.errors});
    } else {
      let data = this.getData();
      $.ajax({
        url: '/auth',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data),
        success: (sData) => {
          if (sData.success) {
            window.localStorage.setItem('accessToken', sData.token);
            $('body').removeClass('gray-bg');
            window.location.replace('#/');
          } else {
            let errors = this.state.errors;
            errors.username = sData.msg;
            this.setState({errors: errors});
          }
        }
      });
    }
  },

  render() {
    let errors = this.state.errors;

    let usernameClasses = cx({
      "form-group": true,
      "has-error": errors.username
    });

    let passwordClasses = cx({
      "form-group": true,
      "has-error": errors.password
    });

    return (
      <div onSubmit={this.handleSubmit} className="middle-box text-center loginscreen">
        <div>
          <form className="m-t" role="form">
            <div className={usernameClasses}>
              <label className="error">{errors.username}</label>
              <input name="username" ref="username"
                onChange={this.handleChange}
                type="text" className="form-control" placeholder="Username"
              />
            </div>
            <div className={passwordClasses}>
              <label className="error">{errors.password}</label>
              <input name="password" ref="password"
                onChange={this.handleChange}
                type="password" className="form-control" placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary block full-width m-b">Login</button>
          </form>
        </div>
      </div>
    );
  }
});


export default () => {
  $('body').addClass('gray-bg');
  return (
    <PageComponent/>
  );
};
