import axios from "axios";

const _API_URL = process.env.REACT_APP_API_URL;

const getShapes = async (offset = 0, limit = 15) => {
  const filter = {
    // order: ["created ASC"],
    order: ["viewCount DESC"],
    offset,
    limit,
  };
  const res = await axios.get(
    encodeURI(`${_API_URL}/shapes?filter=${JSON.stringify(filter)}`)
  );
  return res.data;
};

const postShape = async (data) => {
  return axios.post(`${_API_URL}/shapes`, data);
};

const incrementViewCount = async (id) => {
  if (!id) {
    return undefined;
  }
  return axios.patch(`${_API_URL}/shapes/incrementViewCount/${id}`);
};

const hasSequence = async (sequence) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/shapes/hasSequence/${sequence}`
  );
  return res.data;
};

export { getShapes, postShape, incrementViewCount, hasSequence };
