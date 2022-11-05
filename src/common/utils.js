import moment from 'moment';
import { toast } from 'react-nextjs-toast';
import { Select } from 'antd';

const { Option } = Select;

export const isObjEmpty = (obj1) => {
  let flag = true
  const traverseNode = (arr, id, n, obj) => {
    if (id >= n) return

    if (obj[arr[id]] instanceof Object) {
      traverseNode(
        Object.keys(obj[arr[id]]),
        0,
        Object.keys(obj[arr[id]]).length,
        obj[arr[id]]
      )
    } else if (obj[arr[id]] !== '') {
      flag = false

      return
    } else {
      traverseNode(arr, id + 1, n, obj)
    }
  }
  traverseNode(Object.keys(obj1), 0, Object.keys(obj1).length, obj1)

  return flag
}

export const mappedStationData = (data, disableStation) => {
  let filtered = data.length > 0 ? data.map((itm, idx) => {
    // .StationName, itm.StationCRSCode, itm.StationNLCCode, itm.TodAvailable, itm.LocationDetail
    // const entries = Object.entries(itm);
    return (
      <Option disabled={itm.StationName === disableStation} data={itm} title={itm.StationName} key={idx} value={itm.StationName} >{itm.StationName}</Option>
    )
  }) : []
  return filtered
}

export const mappedZoneData = (data, disableStation) => {
  let filtered = data.length > 0 ? data.map((itm, idx) => {
    // .StationName, itm.StationCRSCode, itm.StationNLCCode, itm.TodAvailable, itm.LocationDetail
    // const entries = Object.entries(itm);
    return (
      <Option disabled={itm.name === disableStation} data={itm} title={itm.name} key={idx} value={itm.name} >{itm.name}</Option>
    )
  }) : []
  return filtered
}

export const SeatNumbersArrayMap = (arr) => {

  if (arr.length > 0) {
    let res = arr.toString().split(",")
    return res.join(", ")
  } else {
    return
  }
}

export const dateTimeConvertUtc = (date, time) => {
  if (date && time) {
    let formatDate = moment(date).format("YYYY-MM-DD")
    let concatDateTime = `${formatDate}T${time}:00`
    let result = moment(concatDateTime).format("YYYY-MM-DDTHH:mm:ss")

    return result
  } else {
    return null
  }

}

export const FirstLetterUpperCase = (data) => {

  return data ? data.charAt(0).toUpperCase() + data.slice(1) : ''
}

export const removeEmojis = (string) => {
  let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  let result = string.replace(regex, '');

  return result.trimLeft()
}


export const isInternetConnected = (history) => {

  const customId = "custom-id-yes";

  if (!navigator.onLine) {
    toast.dismiss();
    toast.error('Please check your internet connection.', {
      position: toast.POSITION.TOP_RIGHT,
      toastId: customId
    });
    // localStorage.removeItem('token');
    // history.push('/login');
  }
  return navigator.onLine;
}