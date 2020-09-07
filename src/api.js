import axios from "axios";

const PUBLIC_URL = process.env.PUBLIC_URL;
const API_URL = process.env.REACT_APP_API_URL;

const getStandardShapes = async () => {
  const res = await axios.get(`${PUBLIC_URL}/standardShapes.json`);
  return res.data;
};

const getShapes = async () => {
  const res = await axios.get(
    encodeURI(`${API_URL}/shapes?filter={"order":["viewCount DESC"]}`)
  );
  return res.data;
};

const postShape = async (data) => {
  return axios.post(`${API_URL}/shapes`, data);
};

const incrementViewCount = async (id) => {
  if (!id) {
    return undefined;
  }
  return axios.patch(`${API_URL}/shapes/incrementViewCount/${id}`);
};

const hasSequence = async (sequence) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/shapes/hasSequence/${sequence}`
  );
  return res.data;
};

export {
  getStandardShapes,
  getShapes,
  postShape,
  incrementViewCount,
  hasSequence,
};
