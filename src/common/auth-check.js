export default () => {
  console.log('authCheck');
  if (window.localStorage.accessToken) {
    return true;
  }
  else {
    window.location.replace('#/login');
    return false;
  }
};
