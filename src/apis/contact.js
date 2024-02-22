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

const trimObject = (data) => {
  for (const key in data) {
    if (Array.isArray(data[key]) && data[key].length === 0) {
      delete data[key];
    } else if (key === "birthday") {
      // Check if birthday is a valid date
      const isValidDate =
        new Date(data[key]) instanceof Date &&
        !isNaN(new Date(data[key]).getTime());
      if (!isValidDate || data[key] === "") {
        delete data[key];
      }
    } else if (typeof data[key] === "string" && data[key].trim() === "") {
      delete data[key];
    }
  }
  return data;
};

export const createContact = async (data, jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `/contacts/`;

  let body = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    notes: data.notes,
    birthday: data.birthday,
    company: data.company,
    address: data.address,
    source: data.source,
    labels: data.labels, // array
    contact_numbers: data.contact_numbers, // array
  };

  const res = await axios.post(`${baseURL + path}`, trimObject(body), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res;
};

export const updateContact = async (data, contactId, jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `contacts/${contactId}`;

  let body = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    notes: data.notes,
    birthday: data.birthday,
    company: data.company,
    address: data.address,
    source: data.source,
  };

  const res = await axios.put(`${baseURL + path}`, trimObject(body), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};

export const deleteContact = async (contactId, jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `contacts/${contactId}`;

  const res = await axios.delete(`${baseURL + path}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};
