import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Input, Button, Row, Col } from 'antd';
import { register } from '../../../state/actions/user';
import { selectRegister } from '../../../state/selectors';
import { history } from '../../../helpers';
export class Register extends Component {
  handleSubmit = (values) => {
    delete values.confirm;
    const { dispatch } = this.props;
    dispatch(register(values));
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
      <div className="container mx-auto h-screen flex flex-col items-center">
        <div style={{ marginTop: '64px' }}>
          <h1 className="text-4xl text-yellow-700">REGISTER from Dev</h1>
        </div>
        <div
          style={{ width: '600px' }}
          className="border rounded-lg border-gray-400 m-4 p-4 shadow-lg"
        >
          <Form onFinish={this.handleSubmit}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="fname" label="First Name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lname" label="Last Name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="email" label="E-mail">
              <Input />
            </Form.Item>

            <Form.Item
              required
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
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  register: selectRegister,
});
export default connect(mapStateToProps, null)(Register);
