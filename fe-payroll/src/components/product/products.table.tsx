import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, Space, TableProps, Select, Input } from 'antd';
import { callCreateProduct, callDeleteProduct, callFetchProduct, callUpdateProduct } from '@/config/api';
import { IProduct } from '@/types/backend';
import { GenericModal } from '@/components/customizeHook/GenericModal';
import { useFetchAndOperate } from '@/components/customizeHook/CustomHook';
const { Option } = Select;
const { Search } = Input;
export const ProductManagement = () => {
  const {
    data: Products,
    loading,
    createItem,
    updateItem,
    deleteItem,
    fetchData,
    pagination,searchTerm,
    setSearchTerm,
    setPagination,
  } = useFetchAndOperate({
    fetchFunction: callFetchProduct,
    createFunction: callCreateProduct,
    updateFunction: callUpdateProduct,
    deleteFunction: callDeleteProduct,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<IProduct | null>(null);
  const [isdisable, setIsdisable] = useState(true);
  const [showEmployeeId, setShowID] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);


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
  const handleEditOrView = (record: IProduct, viewMode: boolean) => {
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
  const [filteredRows, setFilteredRows] = useState(Products);
  const handleSearch = (value: any) => {
    setSearchTerm(value.toLowerCase());
  };
  useEffect(() => {
    const searchResults = Products.filter(row =>
      Object.values(row).some((value: any) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRows(searchResults);
  }, [searchTerm, Products]);
  const columns: TableProps<IProduct>['columns'] = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'imgURL',
      key: 'imgURL',
      render: (imgURL: string) => imgURL ? <img src={imgURL} alt="Product" style={{ width: "30px", height: "30px", borderRadius: "50%" }} /> : 'No image',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: IProduct) => (
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
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, marginLeft: 10 }}
          />
        </div>
        <button onClick={handleAddNewUser}>Add New</button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredRows}
        loading={loading}
        rowKey="Product_Plan_ID"
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
          onCreate={(item: IProduct) => {
            const payload = {
              // ...item,
              // price: Number(item.price),

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
            // // Bỏ qua field Product_Plan_ID ở đây vì không cần nhập
            // { key: '_id', label: '_id', type: 'text', hideInAddMode: true, disabledInEditMode: true },
            // { key: 'name', label: 'name', type: 'text' },
            // { key: 'category', label: 'category', type: 'text' },
            // { key: 'price', label: 'price', type: 'number' },
            // { key: 'imgURL', label: 'imgURL', type: 'text' },
          ]}
        />
      )}
    </div>
  );
};
