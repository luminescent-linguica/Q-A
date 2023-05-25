const pool = require('../db/postgresql');

// Drop old tables
const dropTablesQuery = `
 DROP TABLE IF EXISTS questions, answers, answers_photos ;
`;

// Create table schemas
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS questions (
    id INT PRIMARY KEY,
    product_id INT,
    body TEXT,
    date_written TIMESTAMP,
    asker_name TEXT,
    asker_email TEXT,
    reported BOOLEAN,
    helpful INT
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INT PRIMARY KEY,
    question_id INT,
    body TEXT,
    date_written TIMESTAMP,
    answerer_name TEXT,
    answerer_email TEXT,
    reported BOOLEAN,
    helpful INT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
  );

  CREATE TABLE IF NOT EXISTS answers_photos (
    id INT PRIMARY KEY,
    answer_id INT,
    url TEXT,
    FOREIGN KEY (answer_id) REFERENCES answers(id)
  );
`;

// transfer all data from csv into DB

const copyQuery = `
COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/answers_photos.csv' DELIMITER ',' CSV NULL 'null' HEADER;

COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/answers.csv' DELIMITER ',' CSV NULL 'null' HEADER;

COPY answers_photos(id, answer_id, url)
FROM '/Users/matthewbaseman/HackReactor/RFP2303/QandA-API/data/answers_photos.csv' DELIMITER ',' CSV NULL 'null' HEADER;
`;

module.exports = {
  connectPgDatabase: async () => {
    try {
      const client = await pool.connect();
      // Execute the drop tables query
      await client.query(dropTablesQuery);
      // Execute the create tables query
      await client.query(createTablesQuery);
      // Transfer the full application data set into database
      await client.query(copyQuery);
      client.release();
      console.log('Data copied successfully');
    } catch (err) {
      console.log('Error connecting to pg db: ', err);
    }
  },


};