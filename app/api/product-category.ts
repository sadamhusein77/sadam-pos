import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { findMaxId, generateNextPlu, getUserData } from '@/helpers';

const productsFilePath = path.join(process.cwd(), 'data/product-category.json');

export default (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const { page = '1', limit = '10' } = req.query;
  
  let productData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

  switch (method) {
    case 'GET':
      // Paginate product
      const startIndex = (Number(page) - 1) * Number(limit);
      const endIndex = startIndex + Number(limit);
      const paginatedProduct = productData.slice(startIndex, endIndex);

      res.status(200).json(paginatedProduct);
      break;

    case 'POST':
      // Create a new product
      const { name, product_category_id, active } = req.body;
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      const newPost = {
        id: findMaxId(products),
        plu: generateNextPlu(products),
        name,
        product_category_id,
        active,
        created_user: getUserData(),
        created_date: new Date(),
        updated_user: null,
        updated_date: null,
      };
      products.push(newPost);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.status(201).json(newPost);
      break;

    case 'PUT':
      // Update a post by ID
      const { id, plu, name: updatedName, product_category_id: updatedCategoryId, active: updatedActive, updated_user } = req.body;
      productData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      const updatedProducts = productData.map((product: any) =>
        product.id === id
          ? { ...product, plu, name: updatedName, product_category_id: updatedCategoryId, active: updatedActive, updated_user, updated_date: new Date() }
          : product
      );
      fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
      res.status(200).json({ message: 'Product updated successfully' });
      break;

    case 'DELETE':
      // Delete a post by ID
      const postId = req.query.id;
      const productDataToDelete = JSON.parse(
        fs.readFileSync(productsFilePath, 'utf-8')
      );
      const filteredProducts = productDataToDelete.filter(
        (product: any) => product.id !== parseInt(postId as string)
      );
      fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));
      res.status(200).json({ message: 'Post deleted successfully' });
      break;

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
};
