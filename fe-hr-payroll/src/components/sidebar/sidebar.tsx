import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const getSelectedKey = () => {
    switch (location.pathname) {
      case '/':
        return '1';
      case '/user':
        return '2';
      case '/product':
        return '3';
      case '/payrate':
        return '4';
      case '/benefit':
        return '5';
      case '/job':
        return '6';
      case '/Logout':
        return '7';
      default:
        return '';
    }
  }
  return (
    <Sider width={270} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        // defaultOpenKeys={['sub1']}
        style={{
          height: '100%',
          borderRight: 0,
          color: 'gray',
          borderRadius: '5px'
        }}
        className="custom-menu"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />} >
          <Link to="/">DashBoard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/user">User</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileOutlined />}>
          <Link to="/payrate">PayRate</Link>
        </Menu.Item>

      </Menu>
      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        // defaultOpenKeys={['sub1']}
        style={{
          marginTop: '7px',
          height: '100%',
          borderRight: 0,
          color: 'gray',
          borderRadius: '5px'
        }}
        className="custom-menu"
      >

        <Menu.Item key="5" icon={<FileOutlined />}>
          <Link to="/benefit">BenefitPlan</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<TeamOutlined />}>
          <Link to="/job">JobHistory</Link>
        </Menu.Item>
      </Menu>
      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        // defaultOpenKeys={['sub1']}
        style={{
          marginTop: '7px',
          height: '100%',
          borderRight: 0,
          color: 'gray',
          borderRadius: '5px'
        }}
        className="custom-menu"
      >

        <Menu.SubMenu key="sub1" icon={<FileOutlined />} title="More Pages">
          <Menu.Item key="more-1">Page 1<Link to="/more/page1" /></Menu.Item>
          <Menu.Item key="more-2">Page 2<Link to="/more/page2" /></Menu.Item>
          <Menu.Item key="more-2">Page 2<Link to="/more/page2" /></Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="7" icon={<TeamOutlined />}>
          <Link to="/Logout">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>


  );
};

export default Sidebar;
