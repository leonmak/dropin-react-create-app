export const profileImg = (facebookId, width=100) => `http://graph.facebook.com/${facebookId}/picture?width=${width}`;
export const msgUrl = facebookId => `http://m.me/${facebookId}`;
