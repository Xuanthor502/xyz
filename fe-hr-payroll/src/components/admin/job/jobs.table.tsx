import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Select, Input, message, Popconfirm } from 'antd';
import { callCreateJob, callDeleteJob, callFetchEmployees, callFetchJob, callUpdateJob } from '@/config/api';
import { IJob, IPeople } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
import dayjs from 'dayjs';
const { Option } = Select;
const { Search } = Input;

const JobTable = () => {
    const {
        data: jobs,
        loading,
        createItem,
        updateItem,
        deleteItem,
        fetchData,
        pagination,
        setPagination,
    } = useFetchAndOperate({
        fetchFunction: callFetchJob,
        createFunction: callCreateJob,
        updateFunction: callUpdateJob,
        deleteFunction: callDeleteJob,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<IJob | null>(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isdisable, setIsdisable] = useState(true);
    const [showEmployeeId, setShowID] = useState(false)
    const handleTableChange = (page: number, pageSize?: number) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
    };
    const handleDelete = (id: number) => {
        deleteItem(id).then(() => {
            fetchData(); // Ensure you refetch the data
        });
    };
    const handleAddNewUser = () => {
        setIsModalVisible(true);
        setCurrentItem(null);
        setIsdisable(false);
        setShowID(true); 
    };
    const handleEditOrView = (record: IJob, viewMode: boolean) => {
        setCurrentItem(record);
        setIsModalVisible(true);
        setIsViewMode(viewMode);
        setIsdisable(viewMode); 
        setShowID(false); 
    };
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        callFetchEmployees().then((response: any) => {
            if (response && response.data && Array.isArray(response.data)) {
                setEmployees(response?.data);
            } else {
                setEmployees([]);
                console.error("Expected 'employees' data to be an array, but got:", response.data);
            }
        }).catch(error => console.error("Failed to fetch employees:", error));
    }, []);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Department',
            dataIndex: 'Department',
            key: 'Department',
        },
        {
            title: 'Department Code',
            dataIndex: 'Departmen_Code',
            key: 'Departmen_Code',
        },
        {
            title: 'Name',
            dataIndex: 'Employee',
            key: 'Employee',
            render: (_: any, record: IJob) => `${record.Employee?.First_Name} ${record.Employee?.Last_Name}`,
        },
        {
            title: 'Supervisor',
            dataIndex: 'Supervisor',
            key: 'Supervisor'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: IJob) => (
                <Space size="middle">
                     <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.ID)}>
                        <label >Delete</label>
                    </Popconfirm>
                    <label onClick={() => handleEditOrView(record, false)}>Edit</label>
                    <label onClick={() => handleEditOrView(record, true)}>View</label>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className='headerTable'>

               
                <button onClick={handleAddNewUser}>Add New</button>
            </div>

            <Table
                columns={columns}
                dataSource={jobs}
                loading={loading}
                rowKey="ID"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => { handleTableChange(page, pageSize) }
                }}
            />

            {isModalVisible && (
                <GenericModal
                    visible={isModalVisible}
                    isViewMode={isViewMode}
                    isAddMode={showEmployeeId}
                    onCreate={(item: IJob) => {

                        const payload = {
                            ...item,
                            Supervisor: Number(item.Supervisor),
                            Departmen_Code: Number(item.Departmen_Code),
                            Salary_Type: Number(item.Salary_Type),
                            Hours_per_Week: Number(item.Hours_per_Week),
                            Start_Date: dayjs(item.Start_Date, 'DD/MM/YYYY').toDate(), // Format thành chuỗi
                            End_Date: dayjs(item.End_Date, 'DD/MM/YYYY').toDate(),
                            Hazardous_Training: item.Hazardous_Training ? true : false,

                        };

                        if (currentItem) {
                            updateItem({ ...payload, ID: currentItem.ID }).then(() => {
                                fetchData();
                                setIsModalVisible(false);
                                setCurrentItem(null);
                            });
                        } else {
                            createItem(payload).then(() => {
                                fetchData();
                                setIsModalVisible(false);
                                setCurrentItem(null);
                            });
                        }
                    }}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setCurrentItem(null); 
                    }}
                    item={currentItem || { Deductable: '', Percentage_CoPay: '' }}
                    fields={[
                        { key: 'ID', label: 'ID', type: 'text' , hideInAddMode: true, disabledInEditMode: true},
                        { key: 'Department', label: 'Department', type: 'text' },
                        { key: 'Departmen_Code', label: 'Department Code', type: 'number' },
                        { key: 'Division', label: 'Division', type: 'text' },
                        { key: 'Start_Date', label: 'Start Date', type: 'date' },
                        {
                            key: 'End_Date',
                            label: 'End Date',
                            type: 'date',
                        },
                        { key: 'Job_Title', label: 'Job_Title', type: 'text' },
                        { key: 'Job_Category', label: 'Job Category', type: 'text' },
                        { key: 'Supervisor', label: 'Supervisor', type: 'number' },
                        { key: 'Location', label: 'Location', type: 'text' },
                        { key: 'Salary_Type', label: 'Salary Type', type: 'number' },
                        { key: 'Pay_Period', label: 'Pay Period', type: 'text' },
                        { key: 'Hours_per_Week', label: 'Hours per Week', type: 'number' },
                        { key: 'Hazardous_Training', label: 'Hazardous Training', type: 'checkbox' },
                        { key: 'Employee_ID', label: 'Employee', type: 'select', options: employees.map((emp: any) => ({ label: `${emp.First_Name} ${emp.Last_Name}`, value: emp.Employee_ID })) },
                    ]}
                />
            )}
        </div>
    );
};

export default JobTable;
