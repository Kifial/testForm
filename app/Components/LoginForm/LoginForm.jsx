import React from 'react';
import store from '../../Store/Store.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    var body = {
      login: this.state.login,
      password: this.state.password
    };
    xhr.open("POST", '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(body));
    store.dispatch({
      type: 'SEND_REQUEST'
    });
    this.setState({
      login: '',
      password: ''
    });
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        alert('something wrong on server');
      } else {
        const response = JSON.parse(xhr.responseText);
        if (response.Auth == 'Denied') {
          store.dispatch({
            type: 'LOGIN_FAILED'
          });
        } else {
          store.dispatch({
            type: 'LOGGED_IN'
          });
        }
      }
    };
  }
  componentDidMount() {
    this.focus();
  }
  focus() {
    this.loginInput.focus();
  }
  render() {
    if (this.props.status != 'logged') {
      var failedStyle;
      if (this.props.status == 'failed') {
        failedStyle = {
          borderColor: '#f00'
        };
      }
      var loginButton = {};
      if (this.props.sendingRequest) {
        loginButton.text = '';
        loginButton.style = {
          background: `url('images/cogwheel.png') no-repeat 50% 50%`,
          backgroundSize: `26px 26px`
        }
      } else {
        loginButton.text = 'Login';
      }
      return (
        <form className="main-form">
          <div className="main-form__login-wrap">
            <h2 className="main-form__login">Login</h2>
          </div>
          <input
            type="text"
            placeholder="Login"
            name="login"
            value={this.state.login}
            onChange={this.handleChange}
            style={failedStyle}
            className="main-form__input"
            ref={(input) => this.loginInput = input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="main-form__input"
          />
          <button
            onClick={this.handleSubmit}
            className="main-form__button"
            style={loginButton.style}
          >
            {loginButton.text}
          </button>
        </form>
      );
    } else {
      return (
        <div className="success">
          <div className="success__check"></div>
          <h1 className="success__text">Succesfull logged</h1>
        </div>
      );
    }
  }
}

LoginForm.propTypes = {
  sendingRequest: React.PropTypes.bool,
  status: React.PropTypes.string
};

LoginForm.defaultProps = {
  sendingRequest: false,
  status: ''
};

export default LoginForm;