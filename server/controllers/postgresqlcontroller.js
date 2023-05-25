const postgresqlModel = require('../models/postgresqlModel.js');

postgresqlModel.connectPgDatabase();


module.exports = {
  get: (req, res) => {
    postgresqlModel.combineAllTables((err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }
    });
  }
}