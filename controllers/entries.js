  const entries = (req, resp, db, bcrypt) => {
    const { email } = req.body;
    db('users')
    .select('*')
    .where({
      email:email
    })
    .then(rows => {
      if (rows.length > 0){
        const user = rows[0]
        const entries = user.entries + 1;
        db('users')
        .update({
          entries: entries
        })
        .where({
          email:email
        })
        .then(() => {
          resp.json(entries);
        })
        .catch(error => {
          console.log('error in update query (image)');
          console.log(error.message);
          resp.json(null)
        })
      }
      else {
        console.log('nothing returned in select (image)');
        resp.json(null);
      }
    })
    .catch(() => console.log('error in select query (image)'))
}



module.exports = { 
    entries
}