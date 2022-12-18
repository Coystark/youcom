import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  readonly categories = [
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

  async findAll(page = 1, limit = 10) {
    const { data } = await axios.get('https://dummyjson.com/products', {
      params: {
        limit: 100,
        select:
          'title,price,discountPercentage,category,stock,thumbnail,rating',
      },
    });

    const products = data.products
      .filter((product: any) => this.categories.includes(product.category))
      .filter((product: any) => product.stock >= 10)
      .map((product: any) => ({
        ...product,
        discountPercentage: this.getDiscountPercentage(
          product.discountPercentage,
          product.category,
        ),
      }));

    const total = products.length;

    return {
      data: products.slice((page - 1) * limit, page * limit),
      page,
      total,
      pageCount: Math.ceil(total / limit),
    };
  }

  private getDiscountPercentage(discountPercentage: number, category: string) {
    if (
      ['mens-shoes', 'womens-shoes'].includes(category) &&
      discountPercentage > 15
    ) {
      return 15;
    }

    return discountPercentage;
  }
}
