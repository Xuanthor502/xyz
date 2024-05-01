
import { Header } from "@/components/header/Header.components";
import Sidebar from "@/components/sidebar/sidebar";
import '../../styles/home.scss'
import JobTable from "@/components/admin/job/jobs.table";



const JobPage = () => {
    return (
        <>
            <Header></Header>
            <div className="home" >
                <Sidebar></Sidebar>
                <div className="homeContainer">
                    <JobTable></JobTable>
                </div>
            </div>
        </>

    )
}

export default JobPage;