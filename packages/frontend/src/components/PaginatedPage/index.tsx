import React, { useEffect, useState } from "react";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Pagination } from "components/Pagination";
import { ProductCard } from "components/ProductCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { IProduct } from "services/api/products";
import { useProductStore } from "stores/products";

interface Props {
  products: IProduct[];
  currentPage: number;
  totalPages: number;
}

export const PaginatedPage: React.FC<Props> = ({
  products,
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const favorites = useProductStore((state) => state.favorites);

  useEffect(() => {
    if (router.isReady) {
      /**
       * Need to force update so the components will know that the hydration process has finished
       * and we are in client-side now.
       */
      setMounted(true);
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Youcom e-commerce</title>
        <meta
          name="description"
          content={`Statically generated page ${currentPage}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl" p={4} pt={14}>
        <Heading>Página {currentPage}</Heading>
        <Pagination
          onClick={(page) => router.push(`/${page}`)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              hydrated={mounted}
              priority={index < 4}
              favorite={favorites.includes(product.id)}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};
