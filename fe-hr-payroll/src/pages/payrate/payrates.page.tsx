
import { Header } from "@/components/header/Header.components";
import Sidebar from "@/components/sidebar/sidebar";
import '../../styles/home.scss'
import { PayrateManagement } from "@/components/admin/Payrate/Payrates.table";



const PayratePage = () => {
    return (
        <>
            <Header></Header>
            <div className="home" >
                <Sidebar></Sidebar>
                <div className="homeContainer">
                    <PayrateManagement></PayrateManagement>
                </div>
            </div>
        </>

    )
}

export default PayratePage;