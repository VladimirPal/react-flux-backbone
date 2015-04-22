import $ from 'jquery';

export default class Application {
  initialize() {
    $(document).ajaxError( (event, jqxhr, settings, thrownError) => {
      if (jqxhr.status === 401) {
        window.location.replace('#/logout');
      }
    });

    $.ajaxSetup({
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      contentType: 'application/json'
    });

    $.ajaxPrefilter( ( options, originalOptions, jqXHR ) => {
      if (window.localStorage.accessToken) {
        if (options.url.indexOf('?') > 0) {
          options.url += "&";
        } else {
          options.url += "?";
        }
        options.url += "access_token=" + window.localStorage.accessToken;
      }
      return (options);
    });
  }
}
