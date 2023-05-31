DROP TABLE IF EXISTS questions, answers, answers_photos ;

  CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    product_id INT,
    body TEXT,
    date_written BIGINT,
    asker_name TEXT,
    asker_email TEXT,
    reported BOOLEAN,
    helpful INT
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INT PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    body TEXT,
    date_written BIGINT,
    answerer_name TEXT,
    answerer_email TEXT,
    reported BOOLEAN,
    helpful INT
  );

  CREATE TABLE IF NOT EXISTS answers_photos (
    id INT PRIMARY KEY,
    answer_id INT REFERENCES answers(id),
    url TEXT
  );

COPY questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos (id, answer_id, url)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/answers_photos.csv' DELIMITER ',' CSV HEADER;