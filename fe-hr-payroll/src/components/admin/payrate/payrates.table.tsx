import React, { useState } from 'react';
import { Button, Table, Popconfirm, Space, TableProps, Select, Input } from 'antd';
import { callCreatePayrate, callDeletePayrate, callFetchPayrate, callUpdatePayrate } from '@/config/api';
import { IPayrate } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
const { Option } = Select;
const { Search } = Input;
export const PayrateManagement = () => {
    const {
        data: Payrates,
        loading,
        createItem,
        updateItem,
        deleteItem,
        fetchData,
        pagination,
        setPagination,
    } = useFetchAndOperate({
        fetchFunction: callFetchPayrate,
        createFunction: callCreatePayrate,
        updateFunction: callUpdatePayrate,
        deleteFunction: callDeletePayrate,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [currentItem, setCurrentItem] = useState<IPayrate | null>(null);
    const [isdisable, setIsdisable] = useState(true);
    const [showEmployeeId, setShowID] = useState(false)
    
    const handleDelete = (id: any) => {
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
    const handleEditOrView = (record: IPayrate, viewMode: boolean) => {
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
    const columns: TableProps<IPayrate>['columns'] = [
        {
            title: 'Pay_Rate_Name',
            dataIndex: 'Pay_Rate_Name',
            key: 'Pay_Rate_Name',
        },
        {
            title: 'Value',
            dataIndex: 'Value',
            key: 'Value',
        },
        {
            title: 'Tax_Percentage',
            dataIndex: 'Tax_Percentage',
            key: 'Tax_Percentage',
        },
        {
            title: 'Pay_Type',
            dataIndex: 'Pay_Type',
            key: 'Pay_Type',
        },
        {
            title: 'Pay_Amount',
            dataIndex: 'Pay_Amount',
            key: 'Pay_Amount',
        },
        {
            title: 'PT_Level_C',
            dataIndex: 'PT_Level_C',
            key: 'PT_Level_C',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: IPayrate) => (
                <Space size="middle">
                    
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
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
                dataSource={Payrates}
                loading={loading}
                rowKey="Payrate_Plan_ID"
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
                    onCreate={(item: IPayrate) => {
                        const payload = {
                            Pay_Rate_Name: item.Pay_Rate_Name,
                            Value: Number(item.Value),
                            Tax_Percentage: Number(item.Tax_Percentage),
                            Pay_Type: Number(item.Pay_Type),
                            Pay_Amount: Number(item.Pay_Amount),
                            PT_Level_C: Number(item.PT_Level_C),
                        };

                        if (currentItem) {
                            console.log("?" + JSON.stringify(payload))
                            updateItem({ ...payload, _id: currentItem._id }).then(() => {
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
                        setCurrentItem(null); // Đặt lại trạng thái
                    }}
                    item={currentItem || { Deductable: '', Percentage_CoPay: '' }}
                    fields={[
                        // Bỏ qua field Payrate_Plan_ID ở đây vì không cần nhập
                        { key: '_id', label: '_id', type: 'text' , hideInAddMode: true, disabledInEditMode: true},
                        { key: 'Pay_Rate_Name', label: 'Pay_Rate_Name', type: 'text' },
                        { key: 'Value', label: 'Value', type: 'number' },
                        { key: 'Tax_Percentage', label: 'Tax_Percentage', type: 'number' },
                        { key: 'Pay_Type', label: 'Pay_Type', type: 'number' },
                        { key: 'Pay_Amount', label: 'Pay_Amount', type: 'number' },
                        { key: 'PT_Level_C', label: 'PT_Level_C', type: 'number' },
                    ]}
                />
            )}
        </div>
    );
};
