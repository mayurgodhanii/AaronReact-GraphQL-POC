const message = require("./message");
const Promise = require('promise')

exports.getPatientAnswer = async (req, res) => {
  async function db_all(query, params) {
    return new Promise(function (resolve, reject) {
      db.all(query, params, function (err, rows) {
        if (err) { return reject(err); }
        resolve(rows);
      });
    });
  }
  const result = await db_all("select * from patient_questionnaire where patient_id = ?", req.params.id);
  const promises = result.map(async (row) => {
    async function db_all(query, params) {
      return new Promise(function (resolve, reject) {
        db.all(query, params, function (err, rows) {
          if (err) { return reject(err); }
          resolve(rows);
        });
      });
    }
    const result = await db_all("select * from questionnaire_answer as qa INNER JOIN questionnaire_question as qq ON qq.id=qa.question_id where questionnaire_id = ?", row.id);
    return {
      id: row.id,
      patient_id: row.patient_id,
      created_at: row.created_at,
      answer: result
    }
  })
  await Promise.all(promises).then((values) => {
    res.status(200).json({ success: "true", message: message.ANSWER_LIST_SUCCESS, data: values })
  }).catch((error) => {
    res.status(400).json({ success: "fasle", message: error.message })
  });

}
