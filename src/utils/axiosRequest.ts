import instance from '../configAxios';

function handleError(error: any) {
  return {
    success: false,
    data: error.response?.data || null,
    message:
      error?.response?.data?.status_message ||
      error?.message ||
      'Erro ao realizar operação',
  };
}

export const postRequest = async (url: string, obj: any) => {
  const axios = instance();

  try {
    const response = await axios.post(url, obj);
    return {
      success: true,
      data: response.data,
      message: response.data.status_message || 'Operação realizada com sucesso',
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const getRequest = async (url: string, signal?: AbortSignal) => {
  const axios = instance();
  try {
    const response = await axios.get(url, { signal });
    return {
      data: response.data,
      success: true,
      message: 'Operação realizada com sucesso',
    };
  } catch (error: any) {
    if (
      error?.code === 'ERR_CANCELED' ||
      error?.name === 'CanceledError' ||
      error?.name === 'AbortError'
    )
      throw error;

    return handleError(error);
  }
};

export const deleteRequest = async (url: string, data?: any) => {
  const axios = instance();

  try {
    const response = await axios.delete(url, { data });
    return {
      data: response.data,
      success: true,
      message: response.data.status_message || 'Operação realizada com sucesso',
    };
  } catch (error: any) {
    return handleError(error);
  }
};
