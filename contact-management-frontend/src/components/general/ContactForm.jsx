import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  InputNumber,
  Select,
  message
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import { createContact, updateContact } from "../../apis/contact";

import moment from "moment";

const { Option } = Select;

const ContactForm = ({ initialValues, selectedContact, fetchUpdatedList, modalClose }) => {
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

  const onFinish = async (values) => {
    console.log("Received values:", {
      ...values,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
    });

    if (selectedContact === -1) {
      const response = await createContact(
        {
          ...values,
          birthday: values.birthday
            ? values.birthday.format("YYYY-MM-DD")
            : null,
        },
        JSON.parse(Cookies.get("contact")).accessToken
      );
      message.success('Added Contact Successfully')
      fetchUpdatedList()
      modalClose()
      console.log("response contract post : ", response);
      console.log("response contract post : ");
    } else {
      const response = await updateContact(
        {
          ...values,
          birthday: values.birthday
            ? values.birthday.format("YYYY-MM-DD")
            : null,
        },
        initialValues[selectedContact].contact_profile_id,
        JSON.parse(Cookies.get("contact")).accessToken
      );
      message.success('Updated Contact Successfully')
      fetchUpdatedList()
      modalClose()
      console.log("response contract put: ", response);
      console.log("response contract put : ");
    }
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
      <div style={{ border: "1px solid #8850f9", padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
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
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  ghost
                  style={{
                    cursor: selectedContact !== -1 ? "not-allowed" : "pointer",
                    pointerEvents: selectedContact !== -1 ? "none" : "auto",
                    opacity: selectedContact !== -1 ? 0.5 : 1,
                  }}
                >
                  Add Label
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* Contact Numbers */}
      <div style={{ border: "1px solid #8850f9", padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
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
                    <InputNumber
                      style={{ width: "80%" }}
                      placeholder="Number"
                    />
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
                  {/* <Form.Item
                    {...restField}
                    name={[name, "is_primary"]}
                    fieldKey={[fieldKey, "is_primary"]}
                    valuePropName="checked"
                  >
                    <Input type="checkbox" />
                  </Form.Item> */}
                  <MinusCircleOutlined
                    style={{ color: "white" }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  ghost
                  style={{
                    cursor: selectedContact !== -1 ? "not-allowed" : "pointer",
                    pointerEvents: selectedContact !== -1 ? "none" : "auto",
                    opacity: selectedContact !== -1 ? 0.5 : 1,
                  }}
                >
                  Add Number
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
