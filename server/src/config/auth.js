require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const authConfig = {
  secret: process.env.SECRET,
  expiresIn: process.env.TOKEN_EXPIRES,
};

export default authConfig;
