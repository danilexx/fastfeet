import '../bootstrap';

const authConfig = {
  secret: process.env.SECRET,
  expiresIn: process.env.TOKEN_EXPIRES,
};

export default authConfig;
