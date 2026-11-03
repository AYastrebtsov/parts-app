import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.favorit-parts.ru/hs/hsprice/",
  }),
  endpoints: (build) => ({
    getManufacturer: build.mutation({
      query: (values) => {
        return {
          url: ``,
          method: "GET",
          params: {
            key: "00000000-0000-0000-0000-000000000001",
            ...(values?.number && { number: values.number }),
            ...(values?.brand && { brand: values.brand }),
            ...(values?.analogues && { analogues: "on" }),
          },
          validateStatus: (response, result) => {
            let isValid = true;

            if (response.status !== 200) {
              isValid = false;
            }

            if (result.error) {
              isValid = false;
            }

            if (
              result.goods &&
              result.goods.length > 0 &&
              result.goods[0].goodsID === "00000000-0000-0000-0000-000000000000"
            ) {
              isValid = false;
            }

            return isValid;
          },
        };
      },
      transformErrorResponse: (responseMeta) => {
        let message = "Возникла непредвиденная ошибка!";

        if (responseMeta.data.error === "Invalid access key") {
          message = "Неверный ключ доступа";
        } else if (responseMeta.data.error === "Empty key!") {
          message = "Не указан ключ покупателя";
        } else if (responseMeta.data.error === "Invalid key client!") {
          message = "Неверный ключ покупателя, покупатель не найден";
        } else if (responseMeta.data.error === "Empty number goods!") {
          message = "Не указан номер детали";
        } else if (responseMeta.data.error === "Request quota exceeded!") {
          message = "Вы превысили лимит запросов по грузовому ассортименту";
        } else if (
          responseMeta.data.goods &&
          responseMeta.data.goods.length > 0 &&
          responseMeta.data.goods[0].goodsID ===
            "00000000-0000-0000-0000-000000000000"
        ) {
          message = "Указанный артикул не найден!";
        }

        return {
          message: message,
        };
      },
    }),
  }),
});

export const { useGetManufacturerMutation } = api;
