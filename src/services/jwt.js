import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { usersModel } from '../models/users.model.js'

const jwtSecret = process.env.JWT_SECRET || 'Secret'
const Users = usersModel

const cookieExtractor = function (req) {
  let token = null; 
  if (req && req.cookies) token = req.cookies['myAccessToken']
  return token;
};

export default new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtSecret,
}, 
  async (payload, done) => {
    try {
      const user = await Users.findOne({_id: payload.id})
      if(!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  } 
)
