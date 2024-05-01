import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Space, TableProps, Select, Input } from 'antd';
import { callCreateUser, callDeleteUser, callFetchEmployees, callFetchUser, callUpdateUser } from '@/config/api';
import { IPeople, IUser } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
import "styles/users.table.scss";
import { WebSocketContext } from '@/hepper/context';

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
        deleteFunction: callDeleteUser
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isdisable, setIsdisable] = useState(true);
    const [currentItem, setCurrentItem] = useState<IPeople | null>(null);
    const [showEmployeeId, setShowID] = useState(false);
    const [dataUsers, setUsers] = useState<IPeople[]>([]);

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

    const handleEditOrView = (record: IPeople, viewMode: boolean) => {
        setCurrentItem(record);
        setIsModalVisible(true);
        setIsViewMode(viewMode);
        setIsdisable(viewMode);
        setShowID(false);
    };

    const handleTableChange = (page: number, pageSize?: number) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
    };

    const handleSearch = (value: any) => {
        setSearchTerm(value.toLowerCase());
    };
    const fetchDataa = async () => {
        try {
            const response = await callFetchEmployees(); // Giả sử đây là hàm gọi API của bạn
           //@ts-ignore
            setUsers(response.data); // Cập nhật state với dữ liệu nhận được
            // console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    const socket = useContext(WebSocketContext);
    useEffect(() => {
        fetchDataa()

        socket.on('connect', () => {
            console.log("Connected to WebSocket");
        });

        socket.on('NotificationCreate', (newUser: IPeople) => {
            setUsers(prevUsers => [...prevUsers, newUser]);
            setPagination(prev => ({
                ...prev,
                total: prev.total + 1,
                pages: Math.ceil((prev.total + 1) / prev.pageSize)
            }));
        });
        socket.on('dataReceived', (newUser: any) => {
            const newUser1 :any = {
             Employee_ID :  newUser.employeeId,
              First_Name:  newUser.firstName,
              Last_Name: newUser.lastName
            }
            console.log(newUser1)
            setUsers(prevUsers => {
                const exists = prevUsers.some(u => u.Employee_ID === newUser1.Employee_ID);
                if (!exists) {
                    return [...prevUsers, newUser1];
                } else {
                    console.log("Duplicate data received, ignoring.");
                    return prevUsers;
                }
            });
            setPagination(prev => ({
                ...prev,
                total: prev.total + 1,
                pages: Math.ceil((prev.total + 1) / prev.pageSize)
            }));
            
        });

        socket.on('NotificationUpdate', (updatedUser: IPeople) => {
            setUsers(prevUsers => {
                const index = prevUsers.findIndex(u => u.Employee_ID === updatedUser.Employee_ID);
                if (index !== -1) {
                    const newUsers = [...prevUsers];
                    newUsers[index] = updatedUser;
                    return newUsers;
                }
                return prevUsers;
            });
        });

        socket.on('NotificationDelete', (id: number) => {
            const numericId = Number(id); // Chuyển id từ string sang number
            setUsers(prevUsers => {
                const index = prevUsers.findIndex(u => u.Employee_ID === numericId);
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
            setPagination(prevPagination => {
                const newTotal = prevPagination.total - 1;
                const newPages = Math.ceil(newTotal / prevPagination.pageSize);
                let newCurrent = prevPagination.current;
        
                // Nếu trang hiện tại không còn người dùng nào, di chuyển về trang trước đó
                if (prevPagination.current > 1 && newTotal <= (prevPagination.current - 1) * prevPagination.pageSize) {
                    newCurrent = prevPagination.current - 1;
                }
        
                return {
                    ...prevPagination,
                    total: newTotal,
                    pages: newPages,
                    current: newCurrent
                };
            });
        });
        // setUsers(Users);
        return () => {
            socket.off('NotificationCreate');
            socket.off('NotificationUpdate');
            socket.off('NotificationDelete');
            socket.off('dataReceived');
           
        };
    }, [socket]);

    const columns: TableProps<IPeople>['columns'] = [
        {
            title: 'Employee_ID',
            dataIndex: 'Employee_ID',
        },
        {
            title: 'Name',
            key: 'name',
            render: (_, record: IPeople) => `${record.First_Name} ${record.Last_Name}`,
        },
        {
            title: 'Gender',
            dataIndex: 'Gender',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
        },
        {
            title: 'City',
            dataIndex: 'City',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IPeople) => (
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.Employee_ID)}>
                        <label>Delete</label>
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
                <button onClick={handleAddNewUser}>Add New User</button>
            </div>
            <Table
                columns={columns}
                dataSource={Users}
                loading={loading}
                rowKey={record => `${record.Employee_ID}-${record.Phone_Number}`}
                scroll={{ x: true }}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page, pageSize) => handleTableChange(page, pageSize)
                }}
            />
            {isModalVisible && (
                <GenericModal
                    visible={isModalVisible}
                    isViewMode={isViewMode}
                    isAddMode={showEmployeeId}
                    onCreate={(item: IPeople) => {
                        const employeeIdRandom = Math.floor(1000 + Math.random() * 90000000);
                        const genderConverted = item.Gender === 'Male';
                        const shareholderStatusConverted = item.Shareholder_Status === 'Fulltime';
                        const payload = {
                            ...item,
                            Employee_ID: employeeIdRandom,
                            Gender: genderConverted,
                            Shareholder_Status: shareholderStatusConverted,
                            SSN: Number(item.SSN)
                        };
                        if (currentItem) {
                            updateItem({ ...payload, Employee_ID: currentItem.Employee_ID }).then(() => {
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
                        { key: 'Employee_ID', label: 'Employee ID', type: 'text', hideInAddMode: true, disabledInEditMode: true },
                        { key: 'First_Name', label: 'First_Name', type: 'text' },
                        { key: 'Last_Name', label: 'Last_Name', type: 'text' },
                        { key: 'Email', label: 'Email', type: 'text' },
                        { key: 'Phone_Number', label: 'Phone_Number', type: 'text' },
                        { key: 'City', label: 'City', type: 'text' },
                        { key: 'Employment_Status', label: 'Employment_Status', type: 'text' },
                        { key: 'Ethnicity', label: 'Ethnicity', type: 'text' },
                        { key: 'SSN', label: 'SSN', type: 'number' },
                        {
                            key: 'Gender',
                            label: 'Gender',
                            type: 'select',
                            options: [
                                { value: 'Female', label: 'Female' },
                                { value: 'Male', label: 'Male' }
                            ]
                        },
                        {
                            key: 'Shareholder_Status',
                            label: 'Shareholder Status',
                            type: 'select',
                            options: [
                                { value: 'Fulltime', label: 'Fulltime' },
                                { value: 'Parttime', label: 'Parttime' }
                            ]
                        }
                    ]}
                />
            )}
        </div>
    );
};
