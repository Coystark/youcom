import React, { memo } from "react";
import { StarIcon } from "@chakra-ui/icons";
import {
  Spinner,
  Box,
  Button,
  CardBody,
  Stack,
  Heading,
  HStack,
  Divider,
  CardFooter,
  ButtonGroup,
  Card,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useProductStore } from "stores/products";
import { IProduct } from "services/api/products";

interface IProductCardProps {
  product: IProduct;
  hydrated: boolean;
  priority: boolean;
  favorite: boolean;
}

export const ProductCard: React.FC<IProductCardProps> = memo(
  ({ product, hydrated, priority, favorite }) => {
    const toggleFavorite = useProductStore((state) => state.toggleFavorite);

    const discountPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(
      product.price - (product.price * product.discountPercentage) / 100
    );

    const price = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(product.price);

    return (
      <Card>
        <CardBody>
          <Box
            position="relative"
            height="300px"
            overflow="hidden"
            borderRadius="md"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              priority={priority}
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.title}</Heading>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                {discountPrice}
              </Text>
              <Text fontSize="lg" textDecoration="line-through">
                {price}
              </Text>
            </Box>
            <HStack>
              {Array.from({ length: Math.floor(product.rating) }).map(
                (_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <StarIcon color="yellow.300" key={i} />
                )
              )}
              <Text fontSize="xs">({product.rating})</Text>
            </HStack>
          </Stack>
        </CardBody>
        <Divider borderColor="gray.200" />
        <CardFooter justify="center" minH="20">
          <ButtonGroup spacing="2">
            {hydrated ? (
              <Button
                variant={favorite ? "ghost" : "solid"}
                colorScheme="blue"
                onClick={() => toggleFavorite(product.id)}
              >
                {favorite ? "Desmarcar como favorito" : "Marcar como favorito"}
              </Button>
            ) : (
              <Spinner />
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
);
