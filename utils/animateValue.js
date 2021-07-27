const animateValue = (setValue, setIsAnimating, start, end, duration) => {
  setIsAnimating(true);
  if (start === end) {
    setIsAnimating(false);
    return;
  }
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));

  var timer = setInterval(function () {
    current += increment;
    setValue(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
};
export default animateValue;
