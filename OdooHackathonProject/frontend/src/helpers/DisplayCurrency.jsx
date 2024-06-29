const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayINRCurrency;