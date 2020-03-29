const getAvatarUrl = avatar => {
  if (avatar) {
    return `http://localhost:1234/files/${avatar.path}`;
  }
  return null;
};

export default getAvatarUrl;
