import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getProducts, IGetProductResponse } from "services/api/products";
import { PaginatedPage } from "components";

interface Props {
  products: IGetProductResponse;
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return { props: { products }, revalidate: 30 };
};

const Page: NextPage<Props> = ({ products }) => (
  <PaginatedPage
    products={products.data}
    currentPage={products.page}
    totalPages={products.pageCount}
  />
);

export default Page;
