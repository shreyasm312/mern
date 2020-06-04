import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Form, Input, Button, Row, Col } from 'antd';
import { register } from '../../../state/actions/user';
import { selectRegister } from '../../../state/selectors';
import { history } from '../../../helpers';
export class Register extends Component {
  formRef = React.createRef();
  handleSubmit = (values) => {
    const { fname, lname, ...rest } = values;
    rest.name = fname + ' ' + lname;
    const { dispatch } = this.props;
    dispatch(register(rest));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.register !== prevProps.register) {
      if (this.props.register.status === 'success') {
        history.push('/login');
      }
    }
  }
  render() {
    return (
      <div className="w-100 flex">
        <div className="flex-1 w-100">
          <img src="register.png" alt="register"></img>
        </div>
        <div className="flex-1">
          <div
            className="container flex flex-col h-screen text-center justify-center items-center"
            style={{ width: '100%' }}
          >
            <h1 className="text-2xl text-indigo-600">Sign up</h1>
            <h5 className="text-gray-600 text-xs">
              Already have an account?{' '}
              <span>
                <Link className="text-gray-800" to="/login">
                  Login
                </Link>
              </span>
            </h5>
            <Form
              onFinish={this.handleSubmit}
              layout={'vertical'}
              ref={this.formRef}
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="fname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lname"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
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
                  Register
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
  register: selectRegister,
});
export default connect(mapStateToProps, null)(Register);
