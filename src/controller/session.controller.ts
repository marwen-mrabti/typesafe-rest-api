import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the email and password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create access token
  const accessToken = await signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  // Create refresh token
  const refreshToken = await signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // Send refresh & access token back
  return res.send({ accessToken, refreshToken });
};

export const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
};

export const invalidateUserSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
