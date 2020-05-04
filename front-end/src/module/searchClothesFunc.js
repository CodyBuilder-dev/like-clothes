import axios from 'axios';

export const searchClothesFunc = (searchState, setSearchState) => {
  /*
  searchState: { tags: '', name: '', majors: [], middles: [], minors: [] or '', brands }
  setSearchState(searchDataList)
  */
  const url = process.env.REACT_APP_URL + '/clothes/search-clothes';
  axios.get(url, {
    params: {
      tags: searchState.tags,
      name: searchState.name,
      majors: searchState.majors.join(),
      middles: searchState.middles.join(),
      minors: searchState.minors.join(),
      brands: searchState.brands,
    }
  })
  .then((res) => {
    let responseOK = res && res.status === 200 && res.statusText === 'OK';
    if (responseOK) {
      setSearchState(res.data);
    }
  });
}