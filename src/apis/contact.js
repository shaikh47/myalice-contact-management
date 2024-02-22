import axios from "axios";

export const getAllContacts = async (jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = "/contacts/";
  // const params =
  //   "?patient_name_query=" +
  //   encodeURIComponent(patient_name_query) +
  //   "&therapist_id=" +
  //   therapistId;

  const data = await axios.get(`${baseURL + path}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return data;
};

export const createContact = async (data, jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `/login/`;

  let body = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    notes: data.notes,
    birthday: data.birthday,
    company: data.company,
    address: data.address,
    source: data.source,
    labels: data.labels, // might need to trim this
    contact_numbers: data.contact_numbers, // might need to trim this
  };

  const res = await axios.post(`${baseURL + path}`, body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};

export const updateContact = async (data, contactId, jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `/login/`;

  let body = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    notes: data.notes,
    birthday: data.birthday,
    company: data.company,
    address: data.address,
    source: data.source,
    labels: data.labels, // might need to trim this
    contact_numbers: data.contact_numbers, // might need to trim this
  };

  const res = await axios.post(`${baseURL + path + contactId}`, body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};