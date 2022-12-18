import React from "react";
import { GetStaticProps, NextPage } from "next";
import { getProducts, IGetProductResponse } from "services/api/products";
import { PaginatedPage } from "components";

interface Props {
  products: IGetProductResponse;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  const products = await getProducts(page);

  if (products.data.length === 0) {
    return {
      notFound: true,
    };
  }

  // Redirect the first page to `/` to avoid duplicated content
  if (page === 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { products }, revalidate: 30 };
};

export const getStaticPaths = async () => {
  const products = await getProducts();

  const paths = Array.from(
    { length: products.pageCount - 1 },
    (_, i) => `/${i + 2}`
  );

  return { paths, fallback: "blocking" };
};

const Page: NextPage<Props> = ({ products }) => (
  <PaginatedPage
    products={products.data}
    currentPage={products.page}
    totalPages={products.pageCount}
  />
);

export default Page;
