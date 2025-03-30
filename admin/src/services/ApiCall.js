import axios from "axios";
export const commonrequest = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url: url,
    data: body,
    headers: header
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  };
  console.log("config: ", config);
  try {
    const response = await axios(config);
    console.log("Data", response);
    return response;
  } catch (error) {
    console.error("Errorrr", error);
    throw error;
  }
};
