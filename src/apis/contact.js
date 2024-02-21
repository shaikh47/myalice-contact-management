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
