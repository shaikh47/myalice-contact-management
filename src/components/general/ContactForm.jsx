import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const ContactForm = ({ initialValues, selectedContact }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues.length > 0 && selectedContact !== -1) {
      form.setFieldsValue({
        ...initialValues[selectedContact],
        birthday: moment(initialValues[selectedContact]?.birthday),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, selectedContact, form]);

  const onFinish = (values) => {
    console.log("Received values:", {
      ...values,
      birthday: values.birthday.format("YYYY-MM-DD"),
    });
  };

  return (
    <Form
      form={form}
      name="contactForm"
      onFinish={onFinish}
      // initialValues={initialValues[0]}
    >
      <Form.Item label="First Name" name="first_name" style={{ color: "#fff" }}>
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Notes" name="notes">
        <Input />
      </Form.Item>
      <Form.Item label="Birthday" name="birthday">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Company" name="company">
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Source" name="source">
        <Input />
      </Form.Item>

      {/* Labels */}
      <Form.List name="labels">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "label_name"]}
                  fieldKey={[fieldKey, "label_name"]}
                  rules={[
                    { required: true, message: "Please input label name" },
                  ]}
                >
                  <Input placeholder="Label" />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ color: "white" }}
                  onClick={() => remove(name)}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Label
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Contact Numbers */}
      <Form.List name="contact_numbers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "number"]}
                  fieldKey={[fieldKey, "number"]}
                  rules={[{ required: true, message: "Please input number" }]}
                >
                  <InputNumber style={{ width: "80%" }} placeholder="Number" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "contact_type"]}
                  fieldKey={[fieldKey, "contact_type"]}
                  rules={[
                    { required: true, message: "Please select contact type" },
                  ]}
                >
                  <Select placeholder="Contact Type">
                    <Option value="skype">Skype</Option>
                    <Option value="phone">Phone</Option>
                    <Option value="whatsapp">Whatsapp</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "is_primary"]}
                  fieldKey={[fieldKey, "is_primary"]}
                  valuePropName="checked"
                >
                  <Input type="checkbox" />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ color: "white" }}
                  onClick={() => remove(name)}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Number
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
