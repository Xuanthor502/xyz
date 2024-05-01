import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import NotPermitted from "./not-permitted";
import Loading from "../loading";
import NotFound from "../not.found";
import NotAuth from "../not.auth";

const RoleBaseRoute = (props: any) => {
    const user = useAppSelector(state => state.account.user);
    const userRole = user.role.name;

    if (userRole !== 'USER') {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

const ProtectedRoute = (props: any) => {
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated)
    const isLoading = useAppSelector(state => state.account.isLoading)

    return (
        <>
            {isLoading === true ?
                <Loading />
                :
                <>
                    {isAuthenticated === true ?
                        <>
                            {/* <RoleBaseRoute> */}
                                {props.children}
                            {/* </RoleBaseRoute> */}
                        </>
                        :
                        // <Navigate to='/login' replace />
                        <NotAuth />
                    }
                </>
            }
        </>
    )
}

export default ProtectedRoute;