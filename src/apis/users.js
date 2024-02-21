import axios from "axios";

export const signup = async (
  username,
  password,
  email,
  first_name,
  last_name
) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `/signup/`;

  let body = {
    username: username,
    password: password,
    email: email,
    first_name: first_name,
    last_name: last_name,
  };

  try {
    const res = await axios.post(`${baseURL + path}`, body);
    return res;
  } catch (err) {
    console.log(err)
    return {status: 400, data: err.response.data.username[0]};
  }
};

export const login = async (username, password) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = `/login/`;

  let body = {
    username: username,
    password: password,
  };

  const res = await axios.post(`${baseURL + path}`, body);
  return res;
};

export const getLoggedInUserInfo = async (jwt) => {
  const baseURL = import.meta.env.VITE_SERVER;
  const path = "/loggedindata/";
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
