import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from 'react-countup';

const DashboardPage = () => {
    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    return (
        <Row gutter={[25,25 ]} >
             <Col span={24} md={8}>
                <Card style={{
                    WebkitBoxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
                    boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                    color: "gray",
                    height: "160px"
                }} bordered={false}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexFlow: "column",
                        justifyContent: "space-around",
                        height: "100%" // Đảm bảo Statistic chiếm toàn bộ chiều cao của Card
                    }}>
                        <UserOutlined style={{ fontSize: '60px', color: 'rgba(0, 0, 0, 0.65)' }} />
                        <Statistic
                            value={112893}
                            formatter={formatter}
                            title="Active Users"
                            style={{display: "flex", flexFlow: "column-reverse",}}
                        />
                    </div>
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card style={{
                    WebkitBoxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
                    boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                    color: "gray",
                    height: "160px"
                }} bordered={false}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexFlow: "column",
                        justifyContent: "space-around",
                        height: "100%" // Đảm bảo Statistic chiếm toàn bộ chiều cao của Card
                    }}>
                        <UserOutlined style={{ fontSize: '60px', color: 'rgba(0, 0, 0, 0.65)' }} />
                        <Statistic
                            value={112893}
                            formatter={formatter}
                            title="Active Users"
                            style={{display: "flex", flexFlow: "column-reverse",}}
                        />
                    </div>
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card style={{
                    WebkitBoxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
                    boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                    color: "gray",
                    height: "160px"
                }} bordered={false}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexFlow: "column",
                        justifyContent: "space-around",
                        height: "100%" // Đảm bảo Statistic chiếm toàn bộ chiều cao của Card
                    }}>
                        <UserOutlined style={{ fontSize: '60px', color: 'rgba(0, 0, 0, 0.65)' }} />
                        <Statistic
                            value={112893}
                            formatter={formatter}
                            title="Active Users"
                            style={{display: "flex", flexFlow: "column-reverse",}}
                        />
                    </div>
                </Card>
            </Col>

        </Row>
    )
}

export default DashboardPage;