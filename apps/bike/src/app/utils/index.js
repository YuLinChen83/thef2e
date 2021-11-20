import jsSHA from 'jssha';

export const getAuthorizationHeader = () => {
  const UTCString = new Date().toUTCString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(process.env.NX_TDX_KEY, 'TEXT');
  ShaObj.update('x-date: ' + UTCString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization =
    'hmac username="' +
    process.env.NX_TDX_ID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, 'X-Date': UTCString };
};
