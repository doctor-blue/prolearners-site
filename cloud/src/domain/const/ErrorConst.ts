import { Status } from "../model/Status";

export const INVALID_TOKEN = new Status(101, "Invalid token.");
export const EMAIL_ALREADY_EXISTS = new Status(102, "Email already exists.");
export const AUTHENTICATION_FAILURE = new Status(103, "Authentication failure.");
export const INCORRECT_USER_NAME_PWD = new Status(104, "Incorrect user name or password.");
export const EMAIL_DOES_NOT_CORRECT = new Status(105, "Email does not correct.")
export const UNKNOWN_ERR = new Status(106, "Unknown err");
export const REFRESH_TOKEN_FAILURE = new Status(107, "Refresh token failure.");
export const CREATE_CATEGORY_FAILURE = new Status(108, "Can not create category");
export const DELETE_CATEGORY_FAILURE = new Status(109, "Delete category failure.")
export const UPDATE_CATEGORY_FAILURE = new Status(110, "Can not update category");

export const INVALID_USER_INFO = new Status(111,"Invalid user info.")
export const INVALID_CATEGORY_INFO = new Status(112,"Invalid category info.")
export const INVALID_INFO = new Status(111,"Invalid info.")

export const EXECUTE_QUERY_FAILURE = new Status(112, "Execute query failure.");
