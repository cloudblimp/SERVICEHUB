import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const postData = async (data, URL, header) => {
  console.log("postdata:", data, URL, header);
  return await commonrequest("POST", `${BACKEND_URL}${URL}`, data, header);
};
export const docuplaod = async (data) => {
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/doc/addDoc`,
    data,
    "multipart/form-data"
  );
};

export const getcustomerinfo = async () => {
  return await commonrequest("GET", `${BACKEND_URL}/user/getAllUser`);
};
//approval of the sp
export const approveSp = async (id, data) => {
  console.log(data);
  return await commonrequest("PUT", `${BACKEND_URL}/sp/updateSp/${id}`, data);
};

export const addServiceCat = async (data) => {
  console.log("Add Service Cat", data);
  return await commonrequest(
    "POST",
    `${BACKEND_URL}/cat/addCat`,
    data,
    "multipart/form-data"
  );
};
export const addSubCat = async (data, URL) => {
  console.log("Add Sub Cat", data);
  return await commonrequest(
    "POST",
    `${BACKEND_URL}${URL}`,
    data,
    "multipart/form-data"
  );
};
export const addFunction = async (data, URL) => {
  console.log(data);
  console.log(URL);
  return await commonrequest("POST", `${BACKEND_URL}${URL}`, data);
};
export const updateFunction = async (data, URL) => {
  console.log(data);
  console.log(URL);
  return await commonrequest("PUT", `${BACKEND_URL}${URL}`, data);
};
export const getdata = async (URL) => {
  return await commonrequest("GET", `${BACKEND_URL}${URL}`);
};
export const getdatabyid = async (URL) => {
  return await commonrequest(
    "GET",
    `${BACKEND_URL}${URL}`,
    "",
    "multipart/form-data"
  );
};
export const editdata = async (URL, data, headerurl) => {
  return await commonrequest("PUT", `${BACKEND_URL}${URL}`, data, headerurl);
};
