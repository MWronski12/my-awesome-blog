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

// Component that checks if token didn't expire on every new URL
// and sets appropriate global state user variable
export default function AuthVerify() {
  let location = useLocation();
  const [user, setUser] = useGlobalState("user");

  useEffect(() => {
    {
      const userLocalStorage = authService.getUser();

      if (userLocalStorage) {
        const decodedJwt = parseJwt(userLocalStorage.token);
        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
          authService.logout();
          setUser(null);
        } else if (user === null) {
          setUser(userLocalStorage.data);
        }
      }
    }
  }, [location]);

  return <></>;
}
