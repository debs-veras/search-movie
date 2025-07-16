import instance from "../configAxios";

function handleError(error: any) {
  if (!error.response) {
    return {
      success: false,
      tipo: "error",
      status_message: "Não foi possível conectar ao servidor.",
    };
  }

  return {
    success: false,
    tipo: "error",
    status_message:
      error.response.data.status_message || "Erro ao realizar operação",
  };
}

export const putRequest = async (url: string, obj: any) => {
  const axios = instance();
  try {
    const response = await axios.put(url, obj);
    return {
      dados: response.data,
      ...response.data,
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const postRequest = async (url: string, obj: any) => {
  const axios = instance();

  try {
    const response = await axios.post(url, obj);
    return {
      dados: response.data,
      ...response.data,
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const getRequest = async (url: string) => {
  const axios = instance();
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

// apiRequest.ts (ou onde está deleteRequest)
export const deleteRequest = async (url: string, data?: any) => {
  const axios = instance();

  try {
    const response = await axios.delete(url, { data });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const patchRequest = async (url: string, obj: any) => {
  const axios = instance();

  try {
    const response = await axios.patch(url, obj);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};
