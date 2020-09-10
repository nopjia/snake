import axios from "axios";

const _PUBLIC_URL = process.env.PUBLIC_URL;
const _API_URL = process.env.REACT_APP_API_URL;

let _standardShapes;
let _standardSequenceMap;

const getStandardShapes = async () => {
  if (!_standardShapes) {
    const res = await axios.get(`${_PUBLIC_URL}/standardShapes.json`);
    _standardShapes = res.data;
  }
  return _standardShapes;
};

const getShapes = async (offset = 0, limit = 15) => {
  const filter = {
    // order: ["created ASC viewCount DESC"],
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

const _getStandardSequenceMap = () => {
  if (!_standardSequenceMap) {
    _standardSequenceMap = {};
    _standardShapes.forEach((s) => {
      _standardSequenceMap[s.sequence] = s;
    });
  }
  return _standardSequenceMap;
};

const hasSequence = async (sequence) => {
  const standardMap = _getStandardSequenceMap();
  if (standardMap[sequence]) {
    return true;
  }

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
