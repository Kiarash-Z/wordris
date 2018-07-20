const formatTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

export { formatTime, getRandomItem };
