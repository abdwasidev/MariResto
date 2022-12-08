import CONFIG from './config';

const API_DATA = {
  HOMEPAGE: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_DATA;
