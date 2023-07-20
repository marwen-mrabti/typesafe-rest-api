import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";

export const createUserHandler = async (
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
};
