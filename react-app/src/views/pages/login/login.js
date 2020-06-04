import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Form, Input, Button } from 'antd';
import { login } from '../../../state/actions/user';
import { selectLogin } from '../../../state/selectors';
import { history } from '../../../helpers';
export class Login extends Component {
  formRef = React.createRef();
  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(login(values));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.login !== prevProps.login) {
      if (this.props.login.status === 'success') {
        history.push('/dashboard');
      }
    }
  }
  render() {
    return (
      <div className="w-100 flex">
        <div className="flex-1 w-100">
          <img src="login.png" alt="login"></img>
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-screen text-center justify-center items-center">
            <h1 className="text-2xl text-indigo-600">Login</h1>
            <h5 className="text-gray-600 text-xs">
              Don't have an account?{' '}
              <span>
                <Link className="text-gray-800" to="/register">
                  Register
                </Link>
              </span>
            </h5>
            <Form
              onFinish={this.handleSubmit}
              layout={'vertical'}
              ref={this.formRef}
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});
export default connect(mapStateToProps, null)(Login);
