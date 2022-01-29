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
WHERE (:username IS NULL OR username = :username)
  AND (:email IS NULL OR email = :email);