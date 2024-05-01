import { IBackendRes, IBenefit, IModelPaginate } from '@/types/backend';
import { message, notification } from 'antd';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { json } from 'stream/consumers';

interface IUseFetchAndOperateProps {
  fetchFunction: any;
  createFunction: (...args: any[]) => Promise<any>;
  updateFunction: (...args: any[]) => Promise<any>;
  deleteFunction: (...args: any[]) => Promise<any>;

}

export function useFetchAndOperate({
  fetchFunction,
  createFunction,
  updateFunction,
  deleteFunction
}: IUseFetchAndOperateProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    pages: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const fetchData = async (query?: string) => {
    setLoading(true);
    try {
      const response = await fetchFunction(query || `pageSize=${pagination.pageSize}&current=${pagination.current}`);
      // console.log(JSON.stringify(response.data))

      if (response?.data) {
        setData(response.data.result);
        setPagination(prev => ({
          ...prev, 
          total: response.data.meta.total,
          pages: response.data.meta.pages,
        }));
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: response.message,
        });
      }
    } catch (err: any) {
      message.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const query = `pageSize=${pagination.pageSize}&current=${pagination.current}&search=${searchTerm}`;
    fetchData(query);
  }, [pagination.current, pagination.pageSize,searchTerm]);


  const createItem = async (item: any) => {
    try {
      const response = await createFunction(item);
      fetchData();
      if (response.data) {
        message.success("Thêm mới thành công");
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: response.message,
        });
      }
    } catch (error) {
      message.error((error as Error).message);
    }

  };

  const updateItem = async (item: any) => {
    try {
      const response =  await updateFunction(item);
      // console.log(JSON.stringify(response))
      fetchData();
      if (response.data) {
        message.success("Cập nhật thành công");
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: response.message,
        });
      }
    } catch (error) {
      message.error((error as Error).message);
    }

   
  };

  const deleteItem = async (id: any) => {
    try {
   
      const response =  await deleteFunction(id);
      fetchData();
      console.log(JSON.stringify(response))
      if (response.data) {
        message.success("Xoa thành công thành công");
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: response.message,
        });
      }
    } catch (error) {
      message.error((error as Error).message);
    }

    
  };

  return { data, loading, error, createItem, updateItem, deleteItem, pagination, setPagination, fetchData ,searchTerm,setSearchTerm};
};
