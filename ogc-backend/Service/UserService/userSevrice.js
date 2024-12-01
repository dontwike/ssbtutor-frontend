const User = require("../../model/mongodb/user");

async function getUserInfo(userId) {
  const ifUserPresent = await User.findOne({
    _id: userId,
  });

  if (!ifUserPresent) {
    return false;
  }

  return ifUserPresent;
}

export default {
    getUserInfo
}