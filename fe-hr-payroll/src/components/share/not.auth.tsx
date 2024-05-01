import { useNavigate } from "react-router-dom";
import { Button, Result } from 'antd';

const NotAuth = () => {
    const navigate = useNavigate();
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"
                    onClick={() => navigate('/login')}
                >Login</Button>}
            />
        </>
    )
}

export default NotAuth;