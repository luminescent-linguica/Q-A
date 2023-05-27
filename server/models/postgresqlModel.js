const pool = require('../db/postgresql');



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
      `SELECT *
      FROM questions
      WHERE product_id = $1`,
      [params.product_id]
    );
  }

};
