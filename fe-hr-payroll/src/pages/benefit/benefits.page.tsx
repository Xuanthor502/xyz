
import { Header } from "@/components/header/Header.components";
import Sidebar from "@/components/sidebar/sidebar";
import '../../styles/home.scss'
import {BenefitManagement} from "@/components/admin/benefit/benefits.table";



const BenefitPage = () => {
    return (
        <>
            <Header></Header>
            <div className="home" >
                <Sidebar></Sidebar>
                <div className="homeContainer">
                    <BenefitManagement></BenefitManagement>
                </div>
            </div>
        </>

    )
}

export default BenefitPage;