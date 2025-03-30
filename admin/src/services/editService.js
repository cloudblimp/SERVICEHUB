import axios from "axios";

export const editService = async (name, file, id) => {
  const formData = new FormData();
  formData.append("service_name", name);
  formData.append("photo", file);

  try {
    const data = await axios.put(
      `http://localhost:1000/cat/updateCatById/${id}`,
      formData
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
