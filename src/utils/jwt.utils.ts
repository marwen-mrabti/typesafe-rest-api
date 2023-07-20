import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get("publicKey") as string;
const privateKey = config.get("privateKey") as string;

export const signJwt = async (object: object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
