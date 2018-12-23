export const getRandomStr = () => {
  const salt = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

  const len = 16;
  const maxPos = salt.length;
  let ranStr = '';
  for (let i = 0; i < len; i += 1) {
    ranStr += salt.charAt(Math.floor(Math.random() * maxPos));
  }
  return ranStr;
};
