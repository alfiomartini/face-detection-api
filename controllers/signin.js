const signin = (req, resp, db, bcrypt) => {
  const { email, password } = req.body;
  if (password==='' || email ===''){
    return resp.status(404).json({
      message:'Invalid password or email'
    })
  }
  db('login')
  .select('hash_pass')
  .where({
    email:email
  })
  .then(rows => {
    const  hash  = rows[0].hash_pass;
    const validPass = bcrypt.compareSync(password, hash);
    if (validPass){
      db('users')
        .select('*')
        .where({
          email:email
        })
        .then(rows => {
          const currentUser = rows[0];
          resp.status(200).json({
            message: `Login of ${email} was successful`,
            user:currentUser
          });
        })
        .catch(error => resp.status(404).json({message:'Error in fetching user.'}));
      }
      else {
        resp.status(404).json({
          message: 'Invalid user or password.'
        });
      } 
  })
  .catch(data => {
    resp.status(404).json({
    message:'Invalid  email or password.'
    })
  });
};

module.exports = { signin }