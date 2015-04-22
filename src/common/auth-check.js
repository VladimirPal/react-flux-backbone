export default () => {
  if (window.localStorage.accessToken) {
    return true;
  }
  else {
    window.location.replace('#/login');
    return false;
  }
};
