import { apiInstance } from "./axios";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  category: string;
  stock: number;
  thumbnail: string;
  rating: number;
}

export interface IGetProductResponse {
  data: IProduct[];
  total: number;
  pageCount: number;
  page: number;
}

export async function getProducts(page = 1, limit = 10) {
  const { data } = await apiInstance.get("/products", {
    params: { page, limit },
  });
  return data as IGetProductResponse;
}
