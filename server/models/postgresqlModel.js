const pool = require('../db/postgresql');

pool.connect();

module.exports = {
  // connectPgDatabase: async () => {
  //   try {
  //     const client = await pool.connect();
  //     // Execute the drop tables query
  //     // await client.query(dropTablesQuery);
  //     // // Execute the create tables query
  //     // await client.query(createTablesQuery);
  //     // // Transfer the full application data set into database
  //     // await client.query(copyQuery);
  //     client.release();
  //     console.log('Data copied successfully');
  //   } catch (err) {
  //     console.log('Error connecting to pg db: ', err);
  //   }
  // },
  getQuestions: (params) => {
    return pool.query(
      `SELECT
      q.id AS question_id,
      q.body AS question_body,
      q.date_written AS question_date,
      q.asker_name,
      q.helpful AS question_helpfulness,
      q.reported
      FROM questions q
      WHERE (product_id = $1 AND q.reported = false)`,
      [params.product_id]
    );
  },

  getAnswers: (params) => {
    return pool.query(
      `SELECT
      a.id AS answer_id,
      a.body,
      a.date_written AS date,
      a.answerer_name,
      a.helpful AS helpfulness
      FROM answers a
      WHERE (question_id = $1 AND a.reported = false)`,
      [params.question_id]
    );
  },

  postQuestions: (params) => {
    return pool.query(
      `INSERT INTO questions (
        product_id, body, asker_name, asker_email
      ) VALUES (
        $1, $2, $3, $4
      )`,
      [params.product_id, params.body, params.name, params.email]
    )
  },

  postAnswers: (params) => {
    return pool.query(
      `INSERT INTO answers (
        question_id, body, answerer_name, answerer_email
      ) VALUES (
        $1, $2, $3, $4
      )`,
      [params.question_id, params.body, params.name, params.email]
    )
  },

  putQuestions: (params) => {
    return pool.query(
      `UPDATE questions
      SET helpful = (helpful + 1)
      WHERE id = $1`,
      [params.question_id]
    )
  },

  putAnswers: (params) => {
    return pool.query(
      `UPDATE answers
      SET helpful = (helpful + 1)
      WHERE id = $1`,
      [params.answer_id]
    )
  }
};

// jsonb_object_agg(a.id, jsonb_build_object('id', a.id,'body', a.body, 'date', a.date_written, 'answerer_name', a.answerer_name,'helpfulness', a.helpful)) AS answers