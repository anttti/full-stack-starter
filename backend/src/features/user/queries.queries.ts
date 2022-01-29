/** Types generated for queries found in "src/features/user/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'ListAllUsers' parameters type */
export type IListAllUsersParams = void;

/** 'ListAllUsers' return type */
export interface IListAllUsersResult {
  createdAt: Date;
  email: string;
  id: string;
  updatedAt: Date;
  username: string;
}

/** 'ListAllUsers' query type */
export interface IListAllUsersQuery {
  params: IListAllUsersParams;
  result: IListAllUsersResult;
}

const listAllUsersIR: any = {"name":"ListAllUsers","params":[],"usedParamSet":{},"statement":{"body":"SELECT * FROM users","loc":{"a":25,"b":43,"line":2,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users
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
  id: string;
  updatedAt: Date;
  username: string;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {"name":"FindUserById","params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":104,"b":109,"line":5,"col":32}]}}],"usedParamSet":{"userId":true},"statement":{"body":"SELECT * FROM users WHERE id = :userId","loc":{"a":72,"b":109,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE id = :userId
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
  id: string;
}

/** 'InsertUser' query type */
export interface IInsertUserQuery {
  params: IInsertUserParams;
  result: IInsertUserResult;
}

const insertUserIR: any = {"name":"InsertUser","params":[{"name":"user","codeRefs":{"defined":{"a":144,"b":147,"line":9,"col":9},"used":[{"a":217,"b":220,"line":11,"col":44}]},"transform":{"type":"pick_tuple","keys":[{"name":"username","required":false},{"name":"email","required":false}]},"required":false}],"usedParamSet":{"user":true},"statement":{"body":"INSERT INTO users (username, email) VALUES :user RETURNING id","loc":{"a":173,"b":233,"line":11,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (username, email) VALUES :user RETURNING id
 * ```
 */
export const insertUser = new PreparedQuery<IInsertUserParams,IInsertUserResult>(insertUserIR);


/** Query 'FindUsers' is invalid, so its result is assigned type 'never' */
export type IFindUsersResult = never;

/** Query 'FindUsers' is invalid, so its parameters are assigned type 'never' */
export type IFindUsersParams = never;

const findUsersIR: any = {"name":"FindUsers","params":[{"name":"username","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":287,"b":294,"line":15,"col":8},{"a":319,"b":326,"line":15,"col":40}]}},{"name":"email","required":false,"transform":{"type":"scalar"},"codeRefs":{"used":[{"a":337,"b":341,"line":16,"col":8},{"a":363,"b":367,"line":16,"col":34}]}}],"usedParamSet":{"username":true,"email":true},"statement":{"body":"SELECT * FROM users\nWHERE (:username IS NULL OR username = :username)\n  AND (:email IS NULL OR email = :email)","loc":{"a":259,"b":368,"line":14,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users
 * WHERE (:username IS NULL OR username = :username)
 *   AND (:email IS NULL OR email = :email)
 * ```
 */
export const findUsers = new PreparedQuery<IFindUsersParams,IFindUsersResult>(findUsersIR);


