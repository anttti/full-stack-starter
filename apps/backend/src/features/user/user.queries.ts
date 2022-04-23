/** Types generated for queries found in "src/features/user/user.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type color = 'BLUE' | 'GREEN' | 'RED';

export type user_type = 'ADMIN' | 'NORMAL';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type colorArray = (color)[];

/** 'ListAllUsers' parameters type */
export type IListAllUsersParams = void;

/** 'ListAllUsers' return type */
export interface IListAllUsersResult {
  createdAt: Date;
  email: string;
  favoriteColors: colorArray;
  meta: Json;
  updatedAt: Date;
  userId: string;
  username: string;
  userType: user_type;
}

/** 'ListAllUsers' query type */
export interface IListAllUsersQuery {
  params: IListAllUsersParams;
  result: IListAllUsersResult;
}

const listAllUsersIR: any = {"name":"ListAllUsers","params":[],"usedParamSet":{},"statement":{"body":"SELECT * FROM \"users\"","loc":{"a":25,"b":45,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM "users"
 * ```
 */
export const listAllUsers = new PreparedQuery<IListAllUsersParams,IListAllUsersResult>(listAllUsersIR);


/** 'FindUserById' parameters type */
export interface IFindUserByIdParams {
  userId: string | null | void;
}

/** 'FindUserById' return type */
export interface IFindUserByIdResult {
  createdAt: Date;
  email: string;
  favoriteColors: colorArray;
  meta: Json;
  updatedAt: Date;
  userId: string;
  username: string;
  userType: user_type;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {"name":"FindUserById","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":114,"b":119,"line":5,"col":40}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT * FROM \"users\" WHERE \"userId\" = :userId","loc":{"a":74,"b":119,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM "users" WHERE "userId" = :userId
 * ```
 */
export const findUserById = new PreparedQuery<IFindUserByIdParams,IFindUserByIdResult>(findUserByIdIR);


/** 'InsertUser' parameters type */
export interface IInsertUserParams {
  user: {
    username: string | null | void,
    email: string | null | void
  };
}

/** 'InsertUser' return type */
export interface IInsertUserResult {
  userId: string;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {"name":"InsertUser","params":[{"name":"user","codeRefs":{"defined":{"a":154,"b":157,"line":9,"col":9},"used":[{"a":233,"b":236,"line":11,"col":50}]},"transform":{"type":"pick_tuple","keys":[{"name":"username","required":false},{"name":"email","required":false}]},"required":false}],"usedParamSet":{"user":true},"statement":{"body":"INSERT INTO \"users\" (\"username\", \"email\") VALUES :user RETURNING \"userId\"","loc":{"a":183,"b":255,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "users" ("username", "email") VALUES :user RETURNING "userId"
 * ```
 */
export const insertUser = new PreparedQuery<IInsertUserParams,IInsertUserResult>(insertUserIR);


/** 'FindUsers' parameters type */
export interface IFindUsersParams {
  email: string | null | void;
  username: string | null | void;
}

/** 'FindUsers' return type */
export interface IFindUsersResult {
  createdAt: Date;
  email: string;
  favoriteColors: colorArray;
  meta: Json;
  updatedAt: Date;
  userId: string;
  username: string;
  userType: user_type;
}

/** 'FindUsers' query type */
export interface IFindUsersQuery {
  params: IFindUsersParams;
  result: IFindUsersResult;
}

const findUsersIR: any = {"name":"FindUsers","params":[{"name":"username","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":313,"b":320,"line":15,"col":10},{"a":353,"b":360,"line":15,"col":50}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":377,"b":381,"line":16,"col":8},{"a":411,"b":415,"line":16,"col":42}]}}],"usedParamSet":{"username":true,"email":true},"statement":{"body":"SELECT * FROM \"users\"\n  WHERE (:username::text IS NULL OR \"username\" = :username::text)\n  AND (:email::text IS NULL OR \"email\" = :email::text)","loc":{"a":281,"b":422,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM "users"
 *   WHERE (:username::text IS NULL OR "username" = :username::text)
 *   AND (:email::text IS NULL OR "email" = :email::text)
 * ```
 */
export const findUsers = new PreparedQuery<IFindUsersParams,IFindUsersResult>(findUsersIR);


