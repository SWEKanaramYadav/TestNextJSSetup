const bcrypt = require('bcrypt');

const passwordHash = (plainPassword) => {
    const hash = bcrypt.hashSync(plainPassword, 10);
    return hash;
};

const comparePassword = (plainPassword, passwordHash) => {
    // console.log("plainPassword",plainPassword, "passwordHash", passwordHash);
    const compared = bcrypt.compareSync(plainPassword, passwordHash);
    return compared;
};

module.exports = {
    passwordHash,
    comparePassword
}