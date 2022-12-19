import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" data-theme="light" style={{ colorScheme: "light" }}>
      <Head />
      <body className="chakra-ui-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
