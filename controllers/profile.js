 const profile = (req, resp, db, bcrypt) => {
  let { id } = req.params;
  id = Number(id);
  db('users')
  .select('*')
  .where({
    id:id
  })
  .then(rows => {
    if (rows.length > 0) {
      resp.status(200).json(rows[0])
    } 
    else {
      resp.status(404).json(null);
    }
  })
  .catch(error => resp.status(404).json('unable to get profile'))
}

module.exports = { profile }