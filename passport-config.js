/*const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")


function initialize(passport, getUserByEmail, getUserById){
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        // Get users by email
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, {message: "No user found with that email"})
        }
        try {
      //console.log(await bcrypt.compare(password, user.password))
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done (null, false, {message: "Password Incorrect"})
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize
*/

const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")


async function initialize(passport, getUserByEmail, getUserById) {
  // Function to authenticate users
  const authenticateUsers = async (email, password, done) => {
    // Get users by email
    const user = await getUserByEmail(email)
    //const ids = 
    //	console.log(user)
    if (user == null) {
      return done(null, false, { message: "No user found with that email" })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        //console.log(await bcrypt.compare(password, user.password))
        return done(null, user)
      } else {
        return done(null, false, { message: "Password Incorrect" })
      }
    } catch (e) {
      console.log(e);
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUsers))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    const haizz = await getUserById(id)
    return done(null, haizz)
  })
}

module.exports = initialize