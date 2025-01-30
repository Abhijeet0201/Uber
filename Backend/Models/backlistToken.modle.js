const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires:86400 // 24 hour in sec
    }
});
const blacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = blacklistToken;