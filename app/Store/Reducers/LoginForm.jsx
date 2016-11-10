const LoginForm = (state = {}, action) => {
  switch(action.type) {
    case 'SEND_REQUEST':
      return Object.assign({}, state, { sendingRequest: true });
    case 'LOGGED_IN':
      return Object.assign({}, state, { status: 'logged', sendingRequest: false });
    case 'LOGIN_FAILED':
      return Object.assign({}, state, { status: 'failed', sendingRequest: false });
    default:
      return state;
  }
};

export default LoginForm;