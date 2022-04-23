/* @name ListAllUsers */
SELECT * FROM "users";

/* @name FindUserById */
SELECT * FROM "users" WHERE "userId" = :userId;

/*
  @name InsertUser
  @param user -> (username, email)
*/
INSERT INTO "users" ("username", "email") VALUES :user RETURNING "userId";

/* @name FindUsers */
SELECT * FROM "users"
  WHERE (:username::text IS NULL OR "username" = :username::text)
  AND (:email::text IS NULL OR "email" = :email::text);