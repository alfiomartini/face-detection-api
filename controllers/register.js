const SALT_LEN = 10;

const register = (req, resp, db, bcrypt) => {
  const { name, email, password } = req.body;

  if (email==='' || password==='' || name ===''){
    return resp.status(400).json({
      message:'Invalid data'
    })
  }

  const salt = bcrypt.genSaltSync(SALT_LEN);
  const hash = bcrypt.hashSync(password, salt);
  
  // db.transaction also returns a promise
  db.transaction(trx => {
    db('login')
    .returning('email')
    .insert({
      email:email.toLowerCase(),
      hash_pass:hash
    })
    .transacting(trx)
    .then(email => {
      // console.log('hey trx email', email);
      return db('users')
      .returning('*')
      .insert({
        email:email[0].toLowerCase(),
        name:name.toLowerCase(),
        joined:new Date()
      })
      .transacting(trx)
      .then(rows => {
        const user = rows[0];
        return resp.status(200).json({
          message:'Sign up was successful.',
          user: user
        })
      })
        // .catch(() => {throw new Error ('problem with the transaction')});
    })
    .then(trx.commit)
    // trx.rollback must be called with a rejected promise?
    .catch(trx.rollback)
  })
  .then(data => console.log('Transaction register complete.'))
  .catch(error => {
    console.log('error transaction =', error.detail);
    resp.status(400).json({message:'Unable to register this email.'})
  });
}

module.exports = { register }