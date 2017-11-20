import API from '../utils/api';
import { cityList } from '../constant';

export function SetDivision(data) {
  return { type: 'SetDivision', data };
}

export function GetDivision() {
  return dispatch =>
    API.getCity()
      .then((rst) => {
        const cityName = rst.data.substr(0, 2);
        dispatch(SetDivision(cityList.indexOf(cityName) > -1 ? cityName : '未知'));
      })
      .catch((err) => {
        console.log(err);
        // fundebug.notifyError(err);//eslint-disable-line
      })
      .finally(() => {
        // console.log('finally');
      });
}
