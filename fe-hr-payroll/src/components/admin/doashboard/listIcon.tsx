import { PieChartOutlined } from "@ant-design/icons";
import '../../../styles/listicon.scss'
const ListIcon = () => {
  return (
    <>
      <div className="listContainer">
        <div className="itemsContainer">
          <div className="flex-row">
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Messages</p>
            </div>
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Clients</p>
            </div>
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Expresses</p>
            </div>
          </div>
          <div className="flex-row">
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Total Sales</p>
            </div>
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Social Feed</p>
            </div>
            <div className="flex-item">
              <div className='icon'><PieChartOutlined /></div>
              <p>Bounce Rate</p>
            </div>
          </div>
        </div>
        <div className="listLine">
          <ul>
            <li>
              <p>
                <strong>Windows 8</strong> <span className="pull-right small muted">78%</span>
              </p>
              <div className="progress tight">
                <div className='bar bar-fe' style={{ width: '78%' }}>
                </div>
              </div>
            </li>
            <li>
              <p>
                <strong>Mac</strong> <span className="pull-right small muted">56%</span>
              </p>
              <div className="progress tight">
                <div className='bar bar-success' style={{ width: '56%' }}>
                </div>
              </div>
            </li>
            <li>
              <p>
                <strong>Linux</strong> <span className="pull-right small muted">44%</span>
              </p>
              <div className="progress tight">
                <div className="bar bar-warning" style={{ width: "44%" }}>
                </div>
              </div>
            </li>
            <li>
              <p>
                <strong>iPhone</strong> <span className="pull-right small muted">67%</span>
              </p>
              <div className="progress tight">
                <div className="bar bar-danger" style={{ width: "67%" }}>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ListIcon;