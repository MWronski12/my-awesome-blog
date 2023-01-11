import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalState } from "../store";

import { Buffer } from "buffer";
import authService from "../services/auth.service";

const parseJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify() {
  let location = useLocation();
  const [user, setUser] = useGlobalState("user");

  useEffect(() => {
    {
      const token = authService.getToken();

      if (token) {
        const decodedJwt = parseJwt(token);
        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
          authService.logout();
          setUser(null);
        } else if (user === null) {
          setUser({
            id: decodedJwt.id,
            username: decodedJwt.username,
            email: decodedJwt.email,
            roles: decodedJwt.roles,
          });
        }
      }
    }
  }, [location]);

  return <></>;
}
