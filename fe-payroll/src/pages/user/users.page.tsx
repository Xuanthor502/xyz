import {UserTable} from "@/components/admin/users/users.table";
import { Header } from "@/components/header/Header.components";
import Sidebar from "@/components/sidebar/sidebar";
import '../../styles/home.scss'



const UserPage = () => {
    return (
        <>
            <Header></Header>
            <div className="home" >
                <Sidebar></Sidebar>
                <div className="homeContainer">
                    <UserTable></UserTable>
                </div>
            </div>
        </>

    )
}

export default UserPage;