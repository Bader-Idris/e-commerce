const crypto = require('crypto');
// check the zach project's file:
//! lib/passwordUtils.js
// it's important to improve this with best practices
// and fix the jwt file in this though
//! for hashing and salting, we need to fix the /models/mongo/User schema file,
//! and get the properties from above mentioned file
//? john uses great practice as hash(password, salt) after all
const hashString = (string) =>
  crypto.createHash('md5').update(string).digest('hex');//! md5 and SHA-11 should not be used, Sahn Lam

module.exports = hashString;
