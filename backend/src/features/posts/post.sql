/*
  @name InsertPost
  @param post -> (title, body, authorId)
*/
INSERT INTO "posts" ("title", "body", "authorId")
VALUES :post
RETURNING "id";