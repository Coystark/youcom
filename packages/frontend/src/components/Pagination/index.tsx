import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { usePagination } from "hooks/use-pagination";
import { nanoid } from "nanoid";

export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onClick,
}) => {
  const pages = usePagination(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Flex direction="row" gap={4} justify="center" align="center" my={10}>
      {pages.map((pageNumber) => {
        if (pageNumber === "...") {
          return <Text key={nanoid()}>{pageNumber}</Text>;
        }

        return (
          <Button
            size="lg"
            key={pageNumber}
            onClick={() => onClick(pageNumber)}
            variant={pageNumber === currentPage ? "solid" : "ghost"}
          >
            {pageNumber}
          </Button>
        );
      })}
    </Flex>
  );
};
