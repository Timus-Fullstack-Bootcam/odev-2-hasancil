exports.isEmailValid = (email) => {
  const regExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return String(email).toLowerCase().match(regExp);
};

exports.generateUniqueId = () => {
  return Date.now().toString();
};
