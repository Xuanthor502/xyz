import React, { useState } from "react";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import { MailOutlined, EyeOutlined, BarChartOutlined, SearchOutlined } from "@ant-design/icons";
import '../../styles/header.scss'; // Đảm bảo đường dẫn đúng
import { callLogout } from "@/config/api";
import { setLogoutAction } from "@/redux/slice/accountSlide";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            await dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/login');
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="#">Your Profile</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#">Edit Profile</a>
            </Menu.Item>
            <Menu.Item key="2">
                <a href="#">Account Settings</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header">
            <div className="container">
                <div className="nav-collapse">
                    <a className="brand" href="/">Admin</a>
                    <ul className="nav-icons">
                        <li className="active"><a href="#"><MailOutlined /></a></li>
                        <li><a href="#"><EyeOutlined /></a></li>
                        <li><a href="#"><BarChartOutlined /></a></li>
                    </ul>
                    <div className="navbar-search">
                        <input type="text" className="span3"></input>
                        <Button icon={<SearchOutlined />} className="search-btn"></Button>
                    </div>
                </div>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                    <Avatar
                        src="https://th.bing.com/th/id/OIP.4P9EKDRxL8wqhl35uaDK6gHaJQ?rs=1&pid=ImgDetMain"
                        onClick={() => setAnchorEl(!anchorEl)}
                        style={{
                             cursor: 'pointer',
                             width:'40px',
                             height:'40px' ,
                             marginRight:'40px'}}
                        className="avatar"
                        
                    />
                </Dropdown>
            </div>
        </div>
    );
};
