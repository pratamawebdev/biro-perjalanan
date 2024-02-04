import axios, { AxiosResponse, AxiosError } from "axios";

interface Tourist {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: Tourist[];
}

export const getTourist = (
  page: number,
  perPage: number = 10,
  callback: (data: ApiResponse) => void
) => {
  const token = localStorage.getItem("token");

  axios
    .get(
      `https://biroperjalanan.datacakra.com/api/Tourist?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res: AxiosResponse<ApiResponse>) => {
      callback(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
};

export const deleteTourist = (
  id: string,
  callback: (success: boolean) => void
) => {
  const token = localStorage.getItem("token");

  axios
    .delete(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse) => {
      console.log(res);

      callback(true);
    })
    .catch((err: AxiosError) => {
      console.log(err);
      callback(false);
    });
};

export const updateTourist = (
  id: string,
  updatedData: Partial<Tourist>,
  callback: (success: boolean) => void
) => {
  const token = localStorage.getItem("token");

  axios
    .put(
      `https://biroperjalanan.datacakra.com/api/Tourist/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res: AxiosResponse) => {
      console.log(res.data.data);

      callback(true);
    })
    .catch((err: AxiosError) => {
      console.log(err);
      callback(false);
    });
};

export const getTouristDetails = (
  id: string,
  callback: (data: Tourist | null) => void
) => {
  const token = localStorage.getItem("token");

  axios
    .get(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse<Tourist>) => {
      callback(res.data);
    })
    .catch((err: AxiosError) => {
      console.log(err);
      callback(null);
    });
};

export const addTourist = (
  newTouristData: Partial<Tourist>,
  callback: (success: boolean) => void
) => {
  const token = localStorage.getItem("token");

  axios
    .post(`https://biroperjalanan.datacakra.com/api/Tourist`, newTouristData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((_res: AxiosResponse) => {
      callback(true);
    })
    .catch((err: AxiosError) => {
      console.error(err);
      callback(false);
    });
};
