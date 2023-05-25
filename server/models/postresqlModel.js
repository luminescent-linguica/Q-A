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

  combineAllTables: async (callback) => {
    const combineTablesQuery = `
      SELECT p.id AS id, p.name, p.slogan, p.description, p.category, p.default_price,
             r.related_product_id,
             f.feature, f.value,
             s.id  AS style_id, s.name, s.sale_price, s.original_price, s.default_style,
             ph.thumbnail_url, ph.url,
             sk.size, sk.quantity
      FROM product p
      LEFT JOIN related r ON p.id = r.current_product_id
      LEFT JOIN feature f ON p.id = f.product_id
      LEFT JOIN styles s ON p.id = s.productId
      LEFT JOIN photos ph ON s.id = ph.styleId
      LEFT JOIN skus sk ON s.id = sk.styleId
      ORDER BY p.id, r.id, f.id, s.id, ph.id, sk.id;
  `;

    try {
      const client = await pool.connect();
      // Execute the combine tables query
      const result = await client.query(combineTablesQuery);
      callback(null, result);
      client.release();
    } catch (err) {
      console.log('Error combining tables: ', err);
      callback(err, null);
    }
  }
};