export const getFormattedDateTime = () => {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 10);
  const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, "-");
  return `${formattedDate}-${formattedTime}`;
};