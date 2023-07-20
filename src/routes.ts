import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";

import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";

import {
  invalidateUserSessionHandler,
  createUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { requireUser } from "./middleware/requireUser";

import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  getProductsHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/v1/users/new", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/v1/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/v1/sessions", requireUser, getUserSessionHandler);
  app.patch("/api/v1/sessions", requireUser, invalidateUserSessionHandler);

  app.post(
    "/api/v1/products",
    requireUser,
    validateResource(createProductSchema),
    createProductHandler
  );
  app.get("/api/v1/products/all", getProductsHandler);
  app.get(
    "/api/v1/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.patch(
    "/api/v1/products/:productId",
    requireUser,
    validateResource(updateProductSchema),
    updateProductHandler
  );

  app.delete(
    "/api/v1/products/:productId",
    requireUser,
    validateResource(getProductSchema),
    deleteProductHandler
  );
}

export default routes;
