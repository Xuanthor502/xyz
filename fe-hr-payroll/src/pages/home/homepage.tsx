import { Header } from '@/components/header/Header.components';
import Sidebar from '@/components/sidebar/sidebar';
import React from 'react';
import '../../styles/home.scss'
import DashboardPage from '@/components/admin/doashboard/dashboard'; 
import { PieChartOutlined } from '@ant-design/icons';
import ListIcon from '@/components/admin/doashboard/listIcon'; 
import ChartTable from '@/components/admin/doashboard/char'; 
import TablesData from '@/components/admin/doashboard/table'; 
const HomePage = () => {
  return (
    <>

      <Header></Header>
      <div className="home" >
        <Sidebar></Sidebar>
        <div className="homeContainer">
          <div className="widgets">
            <DashboardPage></DashboardPage>
          </div>
          <div className="listIcon">
            <ListIcon></ListIcon>
          </div>
          <div className="componentChart">
            <div className="title">
              <h3>
                Profit Chart
              </h3>
            </div>
            <div className='char'>
              <ChartTable></ChartTable>
            </div>

            <div className='table'>
              <TablesData></TablesData>
            </div>
          </div>

        </div>


      </div >
    </>

  );
}

export default HomePage;