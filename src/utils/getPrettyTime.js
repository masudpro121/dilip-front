const getPrettyTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    let timeString = "";
    if (seconds > 3600) {
      timeString = `${hours}hr ${minutes}min ${remainingSeconds}s`;
    } else if (seconds > 60) {
      timeString = `${minutes}min ${remainingSeconds}s`;
    } else {
      timeString = `${remainingSeconds}s`;
    }
    return timeString;
  };
  export default getPrettyTime