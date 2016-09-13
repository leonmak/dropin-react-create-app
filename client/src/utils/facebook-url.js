export const profileImg = (facebookId, size='normal') => `http://graph.facebook.com/${facebookId}/picture?type=${size}`;
export const msgUrl = facebookId => `http://m.me/${facebookId}`;
