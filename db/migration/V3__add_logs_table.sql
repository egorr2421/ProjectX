CREATE TABLE IF NOT EXISTS x.log (
  id                    SERIAL PRIMARY KEY,
  first_user_id         BIGINT,
  second_user_id        BIGINT,
  created_at            timestamp,
  finished_at           timestamp
);

CREATE UNIQUE INDEX user_email_unq ON x.user (email);
CREATE UNIQUE INDEX user_login_unq ON x.user (email);
CREATE INDEX user_session_id_index ON x.user (session_id);