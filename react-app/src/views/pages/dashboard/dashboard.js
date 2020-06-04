import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Layout, Menu, Card, Avatar, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import {
  userGetAll,
  userEdit,
  userDelete,
  userClear,
} from '../../../state/actions/user';

import {
  selectUserGetAll,
  selectUserEdit,
  selectUserDelete,
  selectLogin,
} from '../../../state/selectors';
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

export class Dashboard extends Component {
  state = {
    users: [],
    userId: undefined,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userGetAll());
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userGetAll !== prevProps.userGetAll) {
      if (this.props.userGetAll.status === 'success') {
        this.setState({
          users: this.props.userGetAll.data,
        });
      }
      if (this.props.userGetAll.status === 'error') {
        const { dispatch } = this.props;
        dispatch(userClear());
      }
    }
    if (this.props.userDelete !== prevProps.userDelete) {
      if (this.props.userDelete.status === 'success') {
        this.setState({
          users: this.state.users.filter(
            (item) => item._id !== this.state.userId
          ),
        });
      }
    }
  }
  onUserDropDown = ({ key }) => {
    if (key === 'delete') {
      const { dispatch } = this.props;
      dispatch(userDelete(this.state.userId));
    } else {
      console.log('edit');
    }
  };
  render() {
    const { users } = this.state;
    const userDropDown = (
      <Menu onClick={this.onUserDropDown}>
        <Menu.Item key={'edit'} className="txtdrkblck">
          Edit
        </Menu.Item>
        <Menu.Item key={'delete'} className="txtdrkblck">
          Delete
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Layout className="layout">
          <Header className="w-screen flex justify-between">
            <p className="text-white">{this.props.login.data.name}</p>
            <Button
              className="my-3"
              onClick={() => this.props.dispatch(userClear())}
            >
              Logout
            </Button>
          </Header>
          <Content style={{ padding: '50px 50px' }} className="h-screen">
            {users.map((item, index) => (
              <div className="site-layout-content" key={index} className="p-4">
                <Card style={{ width: 300 }}>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.name}
                    description={
                      <Dropdown
                        overlay={userDropDown}
                        className="absolute top-0 right-0 p-2"
                        onVisibleChange={() =>
                          this.setState({
                            userId: item._id,
                          })
                        }
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    }
                  />
                  <p>{item.email}</p>
                </Card>
              </div>
            ))}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Shreyas</Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userGetAll: selectUserGetAll,
  userEdit: selectUserEdit,
  userDelete: selectUserDelete,
  login: selectLogin,
});
export default connect(mapStateToProps, null)(Dashboard);
