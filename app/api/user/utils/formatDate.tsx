const formatDate = () => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return <p>{formattedDate}</p>;
};

export default formatDate;
