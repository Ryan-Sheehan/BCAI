const formatMilliseconds = (ms, m, s) => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);

  const minutesString = minutes < 1 ? "" : `${minutes}${m}`;
  const secondsString = `${seconds}${s}`;
  const soundDuration = `${minutesString} ${secondsString}`;
  return soundDuration;
};
export default formatMilliseconds;
