const sha256 = require('sha256');
// This file contains helpers for authentication


module.exports.hashPassword = (password)  => {
    return sha256(password);
}
