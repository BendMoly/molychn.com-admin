const timeFormat = (time) => {
  try {
    if (time === undefined) {
      return '--'
    } else if (time) {
      var oDate = formatTimeZone(time)

      var y = oDate.getFullYear()
      var m = String(oDate.getMonth() + 1).padStart(2, 0)
      var d = String(oDate.getDate()).padStart(2, 0)

      var h = String(oDate.getHours()).padStart(2, 0)
      var min = String(oDate.getMinutes()).padStart(2, 0)
      var s = String(oDate.getSeconds()).padStart(2, 0)

      return `${y}-${m}-${d} ${h}:${min}:${s}`
    } else {
      return '--'
    }
  } catch (e) {
    return '--'
  }
}

const formatTimeZone = (time) => {
  let d = new Date(time)
  let localTime = d.getTime()
  let localOffset = d.getTimezoneOffset() * 60000
  let utc = localTime + localOffset
  let wishTime = utc + (3600000 * 8)
  return new Date(wishTime)
}

export default timeFormat
