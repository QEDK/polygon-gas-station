export const getRelativeTime = (time) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsedTime = new Date().getTime() - new Date(time).getTime();
  // console.log(new Date().getTime());


  if (elapsedTime < msPerMinute) {
    return `${Math.round(elapsedTime / 1000)}s ago`;
  } else if (elapsedTime < msPerHour) {
    return `${Math.round(elapsedTime / msPerMinute)}m ago`;
  } else if (elapsedTime < msPerDay) {
    return `${Math.round(elapsedTime / msPerHour)}h ago`;
  } else if (elapsedTime < msPerMonth) {
    return `${Math.round(elapsedTime / msPerDay)}d ago`;
  } else if (elapsedTime < msPerYear) {
    if (Math.round(elapsedTime / msPerMonth) === 1) {
      return `${Math.round(elapsedTime / msPerMonth)} month ago`;
    }
    return `${Math.round(elapsedTime / msPerMonth)} months ago`;
  } else {
    if (Math.round(elapsedTime / msPerYear) === 1) {
      return `${Math.round(elapsedTime / msPerYear)} year ago`;
    }
    return `${Math.round(elapsedTime / msPerYear)} years ago`;
  }
}
