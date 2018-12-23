import { createBrowserHistory } from 'history';
import { getRoute } from './url';
// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();
const HistoryUtils = {
  push(data) {
    if (typeof data === 'string') {
      history.push(getRoute(data));
    } else if (typeof data === 'object') {
      history.push({
        ...data,
        pathname: getRoute(data.pathname),
      });
    }
  },

  replace(path) {
    history.replace(getRoute(path));
  },

  goBack() {
    history.go(-1);
  },
};
export default HistoryUtils;

export const GoBack = () => {
  HistoryUtils.goBack();
};
