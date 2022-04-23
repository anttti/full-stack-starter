/* @name ListAllUsers */
SELECT * FROM users;

/* @name FindUserById */
SELECT * FROM users WHERE id = :userId;

/*
  @name InsertUser
  @param user -> (username, email)
*/
INSERT INTO users (username, email) VALUES :user RETURNING id;

/* @name FindUsers */
SELECT * FROM users
  WHERE (:username::text IS NULL OR username = :username::text)
  AND (:email::text IS NULL OR email = :email::text);