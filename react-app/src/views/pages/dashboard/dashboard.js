import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Layout,
  Menu,
  Card,
  Avatar,
  Dropdown,
  Button,
  Modal,
  Input,
} from 'antd';
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
    visible: false,
    name: undefined,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    const { dispatch } = this.props;
    const { name, userId } = this.state;
    dispatch(userEdit({ name, userId }));
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    setInterval(function () {
      dispatch(userGetAll());
    }, 60 * 1000);
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
    if (this.props.userEdit !== prevProps.userEdit) {
      if (this.props.userEdit.status === 'success') {
        this.setState({
          ...this.state,
          users: this.state.users.map((item) =>
            item._id === this.state.userId
              ? {
                  ...item,
                  name: this.state.name,
                }
              : item
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
      this.showModal();
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
              <div key={index} className="p-4">
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
        <Modal
          title="Edit user name"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input onChange={(e) => this.setState({ name: e.target.value })} />
        </Modal>
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
