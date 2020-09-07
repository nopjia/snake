const isValidSequence = (s) => {
  return /^[0123]+$/g.test(s);
};

const getSequenceRoute = () => {
  const baseUrl = process.env.PUBLIC_URL;
  let s = window.location.pathname;
  s = s.substring(s.indexOf(baseUrl) + baseUrl.length);
  let indexOf;
  indexOf = s.indexOf("/");
  if (indexOf === 0) {
    s = s.substring(1);
  }
  indexOf = s.indexOf("/");
  if (s.indexOf("/") !== -1) {
    s = s.substring(0, indexOf);
  }
  s = isValidSequence(s) ? s : "";
  return s;
};

export { isValidSequence, getSequenceRoute };
