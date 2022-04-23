/** Types generated for queries found in "src/features/posts/post.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'InsertPost' parameters type */
export interface IInsertPostParams {
  post: {
    title: string | null | void,
    body: string | null | void,
    authorId: string | null | void
  };
}

/** 'InsertPost' return type */
export interface IInsertPostResult {
  postId: string;
}

/** 'InsertPost' query type */
export interface IInsertPostQuery {
  params: IInsertPostParams;
  result: IInsertPostResult;
}

const insertPostIR: any = {"name":"InsertPost","params":[{"name":"post","codeRefs":{"defined":{"a":31,"b":34,"line":3,"col":9},"used":[{"a":124,"b":127,"line":6,"col":8}]},"transform":{"type":"pick_tuple","keys":[{"name":"title","required":false},{"name":"body","required":false},{"name":"authorId","required":false}]},"required":false}],"usedParamSet":{"post":true},"statement":{"body":"INSERT INTO \"posts\" (\"title\", \"body\", \"authorId\")\nVALUES :post\nRETURNING \"postId\"","loc":{"a":66,"b":146,"line":5,"col":0}}};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "posts" ("title", "body", "authorId")
 * VALUES :post
 * RETURNING "postId"
 * ```
 */
export const insertPost = new PreparedQuery<IInsertPostParams,IInsertPostResult>(insertPostIR);


