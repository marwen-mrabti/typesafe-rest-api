import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductInput } from "../model/product.model";

export async function createProduct(productInput: ProductInput) {
  const product = await ProductModel.create(productInput);
  return product;
}

export async function getProducts() {
  const products = await ProductModel.find().lean();
  return products;
}

export async function getProduct(
  query: FilterQuery<ProductInput>,
  options: QueryOptions = { lean: true }
) {
  const product = await ProductModel.findOne(query, {}, options);
  return product;
}

export async function updateProduct(
  query: FilterQuery<ProductInput>,
  update: UpdateQuery<ProductInput>,
  options: QueryOptions = { lean: true }
) {
  const product = await ProductModel.findOneAndUpdate(query, update, options);
  return product;
}

export async function deleteProduct(query: FilterQuery<ProductInput>) {
  const product = await ProductModel.deleteOne(query);
  return "Product deleted successfully";
}
