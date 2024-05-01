import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Checkbox, DatePicker, Button } from 'antd';
import { ProFormDatePicker } from '@ant-design/pro-components';
import dayjs from 'dayjs';

// Cập nhật để thêm Input.Number vào fieldTypes
const fieldTypes: any = {
  text: Input,
  number: (props: any) => <Input {...props} type="number" />,
  select: (props: any) => (
    <Select {...props}>
      {props.options?.map((option: { value: string; label: string }) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  ),
  checkbox: Checkbox,
  date: (props: any) => <ProFormDatePicker {...props}
    fieldProps={{
      format: 'DD/MM/YYYY',
    }}
    rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
    placeholder="dd/mm/yyyy" />,
};

interface Field {
  key: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  hideInAddMode?:boolean;
  disabledInEditMode?:boolean
}

interface IProp {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
  item: any;
  fields: Field[];
  isViewMode: boolean,
  isAddMode:boolean
}

export const GenericModal = (props: IProp) => {
  const { visible, onCreate, onCancel, item, fields, isViewMode ,isAddMode } = props;
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(values => {
      onCreate(values);
      onCancel();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };
  const modalFooter = isViewMode ? [
    <Button key="back" onClick={onCancel}>Close</Button>
  ] : [
    <Button key="submit" type="primary" onClick={handleSubmit}>Save</Button>,
    <Button key="back" onClick={onCancel}>Cancel</Button>
  ];
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(item);
    console.log(fields);
  }, [item, form, visible]);



  return (
    <Modal
      visible={visible}
      title={isViewMode ? "View Details" : "Edit Item"}
      onCancel={onCancel}
      footer={modalFooter}
      width={"80%"}
    >
      <Form form={form} layout="vertical" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {fields.map(({ key, label, type, options, hideInAddMode, disabledInEditMode }) => {
          // Ẩn trường khi ở chế độ thêm mới và trường đó được đánh dấu ẩn
          if (isAddMode && hideInAddMode) return null;

          // Xác định trạng thái disabled dựa trên chế độ và thuộc tính của field
          const disabled = isViewMode || (isAddMode ? false : disabledInEditMode);
          const Component = fieldTypes[type];
          
          return (
            <Form.Item key={key} name={key} label={label} style={{ marginBottom: 8 }}>
              {type === 'select' ? (
                <Select disabled={disabled} defaultValue={item[key]}>
                  {options?.map(option => (
                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                  ))}
                </Select>
              ) : (
                <Component disabled={disabled} />
              )}
            </Form.Item>
          );
        })}
      </Form>
    </Modal >
  );
};
