import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Space, TableProps, Select, Input } from 'antd';
import { callCreateUser, callDeleteUser, callFetchUser, callUpdateUser } from '@/config/api';
import { IEmployee, IPeople, IUser } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
import "../../../styles/users.table.scss"
import dayjs from 'dayjs';
import { WebSocketContext } from '@/config/context';
const { Option } = Select;
const { Search } = Input;
export const UserTable = () => {
    const {
        data: Users,
        loading,
        createItem,
        updateItem,
        deleteItem,
        fetchData,
        pagination,
        setPagination,
        searchTerm,
        setSearchTerm
    } = useFetchAndOperate({
        fetchFunction: callFetchUser,
        createFunction: callCreateUser,
        updateFunction: callUpdateUser,
        deleteFunction: callDeleteUser,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isdisable, setIsdisable] = useState(true);
    const [currentItem, setCurrentItem] = useState<IEmployee | null>(null);
    const [showEmployeeId, setShowID] = useState(false)

    const [dataUsers, setUsers] = useState<IEmployee[]>([])
    const [filteredRows, setFilteredRows] = useState(dataUsers);
    const handleDelete = (id: any) => {
        deleteItem(id).then(() => {
            fetchData();
        });
    };
    const handleAddNewUser = () => {
        setIsModalVisible(true);
        setCurrentItem(null);
        setIsdisable(false);
        setShowID(true);
    };
    const handleEditOrView = (record: IEmployee, viewMode: boolean) => {
        setCurrentItem(record);
        setIsModalVisible(true);
        setIsViewMode(viewMode);
        setIsdisable(viewMode);
        setShowID(false);
    };
    const handleTableChange = (page: number, pageSize?: number) => {
        setPagination((prev: any) => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
    };

    const handleSearch = (value: any) => {
        setSearchTerm(value.toLowerCase());
    };
    const socket = useContext(WebSocketContext);
    const sendDataToServer = (data:any) => {
        socket.emit('sendData', data);
    };
    useEffect(() => {
        // Fetch initial data
        setUsers(Users)
        // fetchData();
        // Setup WebSocket listeners
        socket.on('connect', () => {
            console.log("Connected to WebSocket");
        });

        socket.on('NotificationCreate', (newUser: any) => {
            const user : any = {
                employeeId:newUser.Employee_ID,
                firstName: newUser.First_Name,
                lastName: newUser.Last_Name ,
            }
            setUsers(prevUsers => [...prevUsers, user]);
            // setPagination(prev => {
            //     const newTotal = prev.total + 1;
            //     const newPages = Math.ceil(newTotal / prev.pageSize);
            //     return {
            //         ...prev,
            //         total: newTotal,
            //         pages: newPages
            //     };
            // });
        });

        socket.on('NotificationUpdate', (updatedUser: any) => {
            const user : any = {
                employeeId: updatedUser.Employee_ID,
                firstName: updatedUser.First_Name,
                lastName: updatedUser.Last_Name ,
            }
            // console.log(updatedUser)
            setUsers(prevUsers => {
                const index = prevUsers.findIndex(u => u.employeeId === updatedUser.Employee_ID);
                if (index !== -1) {
                    const newUsers = [...prevUsers];
                    newUsers[index] = user;
                    return newUsers;
                }
                return prevUsers;
            });
        });

        socket.on('NotificationDelete', (id: string) => {
            console.log(id)
            console.log(typeof id)
            const numericId = Number(id);
            // const numericId = Number(id); // Chuyển id từ string sang number
            setUsers(prevUsers => {
                //@ts-ignore
                const index = prevUsers.findIndex(u => u.employeeId === numericId);
                if (index !== -1) {
                    console.log("Tìm thấy ID, index:", index);
                    const newUsers = [...prevUsers];
                    newUsers.splice(index, 1); // Xóa user khỏi mảng
                    return newUsers;
                } else {
                    console.log("Không tìm thấy ID trong mảng.");
                    return prevUsers;
                }
            });
            // setPagination(prevPagination => {
            //     const newTotal = prevPagination.total - 1;
            //     const newPages = Math.ceil(newTotal / prevPagination.pageSize);
            //     let newCurrent = newTotal > 0 ? prevPagination.current : 1;
            //     if (newCurrent > newPages) {
            //         newCurrent = Math.max(1, newPages);
            //     }
            //     return {
            //         ...prevPagination,
            //         total: newTotal,
            //         pages: newPages,
            //         current: newCurrent
            //     };
            // });
        });

        return () => {
            socket.off('NotificationCreate');
            socket.off('NotificationUpdate');
            socket.off('NotificationDelete');
        };
    }, [socket,Users]);
    const columns: TableProps<IEmployee>['columns'] = [

        {
            title: 'ID',
            dataIndex: 'employeeId',

        },
        {
            title: 'Name',
            key: 'name',
            render: (_, record: IEmployee) => `${record.firstName} ${record.lastName}`,

        },

        {
            title: 'BirthDay',
            dataIndex: 'birthDay',

        },
        {
            title: 'VacationDays',
            dataIndex: 'vacationDays',

        },
        {
            title: 'PaidToDate',
            dataIndex: 'paidToDate',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IEmployee) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.employeeId)}>
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

                <div style={{ padding: 0, height: 40 }} >
                    <Select defaultValue={5} style={{ width: 80 }} onChange={(value) => handleTableChange(1, value)}>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 300, marginLeft: 10 }}
                    />
                </div>
                <button onClick={handleAddNewUser}>Add New User</button>
            </div>

            <Table
                columns={columns}
                dataSource={dataUsers}
                loading={loading}
                rowKey={record => `${record.employeeId}-${record.firstName}`}
                scroll={{ x: true }}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => { handleTableChange(page, pageSize) }

                }
                }
            />
            {isModalVisible && (
                <GenericModal
                    visible={isModalVisible}
                    isViewMode={isViewMode}
                    isAddMode={showEmployeeId}
                    onCreate={(item: IEmployee) => {
                        const employeeIdRandom = Math.floor(1000 + Math.random() * 90000000);

                        const payload = {
                            ...item,
                            employeeId: employeeIdRandom,
                            SSN: Number(item.SSN),
                            payRate: Number(item.payRate),
                            vacationDays: Number(item.vacationDays),
                            paidToDate: Number(item.paidToDate),
                            paidLastYear: Number(item.paidLastYear),
                            birthDay: dayjs(item.birthDay, 'DD/MM/YYYY').toDate(),
                        };

                        if (currentItem) {
                            // console.log("?" + JSON.stringify(payload))
                            updateItem({ ...payload, Employee_ID: currentItem.employeeId }).then(() => {
                                fetchData();
                                setIsModalVisible(false);
                                setCurrentItem(null);
                            });
                        } else {
                            sendDataToServer(payload)
                            createItem(payload).then(() => {
                                fetchData();
                                setIsModalVisible(false);
                                setCurrentItem(null);
                            });
                        }
                    }}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setCurrentItem(null); // Đặt lại trạng thái
                    }}
                    item={currentItem || { Deductable: '', Percentage_CoPay: '' }}

                    fields={[
                        { key: 'employeeId', label: 'Employee ID', type: 'text', hideInAddMode: true, disabledInEditMode: true },
                        {
                            key: 'firstName', label: 'First_Name', type: 'text'
                        },
                        {
                            key: 'lastName', label: 'Last_Name', type: 'text'
                        },
                        { key: 'vacationDays', label: 'VacationDays', type: 'number' },
                        { key: 'paidToDate', label: 'paidToDate', type: 'number' },
                        { key: 'paidLastYear', label: 'paidLastYear', type: 'number' },
                        { key: 'payRate', label: 'payRate', type: 'number' },
                        { key: 'payRateId', label: 'payRateId', type: 'number' },
                        { key: 'SSN', label: 'SSN', type: 'number' },
                        { key: 'birthDay', label: 'BirthDay', type: 'date' },
                    ]}
                />
            )}
        </div>
    );
};
