// src/utils/auth.ts
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  roles: string;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const hasRole = (decodedToken: DecodedToken, role: string): boolean => {
  if (!decodedToken || !decodedToken.roles) {
    return false;
  }
  return decodedToken.roles.split(',').includes(role);
};
