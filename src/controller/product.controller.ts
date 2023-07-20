import { Request, Response } from "express";
import logger from "../utils/logger";

import { createProductInput, updateProductInput } from "../schema/product.schema";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../service/product.service";

export const createProductHandler = async (
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    return res.status(200).send(product);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    return res.status(200).send(products);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};

export const getProductHandler = async (
  req: Request<updateProductInput["params"]>,
  res: Response
) => {
  try {
    const productId = req.params.productId;
    const product = await getProduct({ _id: productId });
    if (!product) {
      return res.sendStatus(404);
    }
    return res.status(200).send(product);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};

export const updateProductHandler = async (
  req: Request<updateProductInput["params"], updateProductInput["body"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await getProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }
    if (String(product.user) !== String(userId)) {
      return res.sendStatus(403);
    }

    const updatedProduct = await updateProduct({ _id: productId }, update, { new: true });
    return res.status(200).send(updatedProduct);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};

export const deleteProductHandler = async (
  req: Request<updateProductInput["params"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await getProduct({ _id: productId });
    if (!product) {
      return res.sendStatus(404);
    }
    if (String(product.user) !== String(userId)) {
      return res.sendStatus(403);
    }

    await deleteProduct({ _id: productId });
    return res.status(200).send("Product deleted successfully");
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};
