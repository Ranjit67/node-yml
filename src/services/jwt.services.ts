import jwt from "jsonwebtoken";
import { emailTokenString, accessTokenString } from "../config";

class JwtService {
  private emailTokenString = emailTokenString;
  private accessTokenSecretString = accessTokenString;
  public emailTokenGenerator(userId: any): any {
    return new Promise((resolve, reject) => {
      const payload = {
        name: "Your trust.",
        iss: "sky-rise.com",
      };
      const secretKey = this.emailTokenString;

      jwt.sign(
        payload,
        secretKey,
        {
          audience: [userId],
        },
        (err, token) => {
          if (err) return reject(err);
          return resolve(token);
        }
      );
    });
  }
  public emailTokenVerify(token: any): any {
    const secretKey = this.emailTokenString;

    return jwt.verify(token, secretKey, (err: any, payload: any): any => {
      if (err) return err;
      return payload;
    });
  }
  public accessTokenGenerator(userId: any): any {
    return new Promise((resolve, reject) => {
      const payload = {
        name: "Your trust.",
        iss: "sky-rise.com",
      };
      const secretKey = this.accessTokenSecretString;

      jwt.sign(
        payload,
        secretKey,
        {
          audience: [userId],
        },
        (err, token) => {
          if (err) return reject(err);
          return resolve(token);
        }
      );
    });
  }
  public accessTokenVerify(token: any): any {
    const secretKey = this.accessTokenSecretString;

    return jwt.verify(token, secretKey, (err: any, payload: any): any => {
      if (err) return err;
      return payload;
    });
  }
}
export default JwtService;
