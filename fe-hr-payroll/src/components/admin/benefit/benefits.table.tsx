import React, { useState } from 'react';
import { Button, Table, Popconfirm, Space, TableProps, Select, Input } from 'antd';
import { callCreateBenefit, callDeleteBenefit, callFetchBenefit, callUpdateBenefit } from '@/config/api';
import { IBenefit } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
const { Option } = Select;
const { Search } = Input;
export const BenefitManagement = () => {
  const {
    data: benefits,
    loading,
    createItem,
    updateItem,
    deleteItem,
    fetchData,
    pagination,
    setPagination,
  } = useFetchAndOperate({
    fetchFunction: callFetchBenefit,
    createFunction: callCreateBenefit,
    updateFunction: callUpdateBenefit,
    deleteFunction: callDeleteBenefit,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<IBenefit | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isdisable, setIsdisable] = useState(true);
  const [showEmployeeId, setShowID] = useState(false)

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
const handleEditOrView = (record: IBenefit, viewMode: boolean) => {
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
  const columns: TableProps<IBenefit>['columns'] = [
    {
      title: 'Benefit_Plan_ID',
      dataIndex: 'Benefit_Plan_ID',
      key: 'Benefit_Plan_ID',
    },
    {
      title: 'Plan_Name',
      dataIndex: 'Plan_Name',
      key: 'Plan_Name',
    },
    {
      title: 'Deductable',
      dataIndex: 'Deductable',
      key: 'Deductable',
    },
    {
      title: 'Percentage_CoPay',
      dataIndex: 'Percentage_CoPay',
      key: 'Percentage_CoPay',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: IBenefit) => (
        <Space size="middle">
           <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.Benefit_Plan_ID)}>
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
            // onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, marginLeft: 10 }}
          />
        </div>
        <button onClick={handleAddNewUser}>Add New</button>
      </div>

      <Table
        columns={columns}
        dataSource={benefits}
        loading={loading}
        rowKey="Benefit_Plan_ID"
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
          onCreate={(item: any) => {
            const payload = {
              ...item,
              Deductable: Number(item.Deductable),
              Percentage_CoPay: Number(item.Percentage_CoPay),
            };

            if (currentItem) {
              updateItem({ ...payload, Benefit_Plan_ID: currentItem.Benefit_Plan_ID }).then(() => {
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
            // Bỏ qua field Benefit_Plan_ID ở đây vì không cần nhập
            { key: 'Benefit_Plan_ID', label: 'Benefit_Plan_ID', type: 'text' , hideInAddMode: true, disabledInEditMode: true},
            { key: 'Plan_Name', label: 'Plan_Name', type: 'text' },
            { key: 'Deductable', label: 'Deductable', type: 'number' },
            { key: 'Percentage_CoPay', label: 'Percentage_CoPay', type: 'number' },
          ]}
        />
      )}
    </div>
  );
};
