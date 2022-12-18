import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('RF02: Restringir o catálogo de produtos para apresentar somente artigos de vestuário, calçados e acessórios de moda', async () => {
    const products = await request(app.getHttpServer()).get(
      '/products?limit=100',
    );

    const categories = [
      'tops',
      'womens-dresses',
      'womens-shoes',
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
      'sunglasses',
    ];

    products.body.data.forEach((product: any) => {
      expect(categories.includes(product.category)).toBeTruthy();
    });
  });

  it('RF3: Produtos com menos de 10 peças em estoque não devem ser apresentados', async () => {
    const products = await request(app.getHttpServer()).get(
      '/products?limit=100',
    );

    products.body.data.forEach((product: any) => {
      expect(product.stock >= 10).toBeTruthy();
    });
  });

  it('RF4: O desconto máximo para calçados deve ser de 15%', async () => {
    const products = await request(app.getHttpServer()).get(
      '/products?limit=100',
    );

    products.body.data.forEach((product: any) => {
      if (['mens-shoes', 'womens-shoes'].includes(product.category)) {
        expect(product.discountPercentage <= 15).toBeTruthy();
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
