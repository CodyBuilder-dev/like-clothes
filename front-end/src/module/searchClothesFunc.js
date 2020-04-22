import axios from 'axios';

export const searchClothesFunc = (searchState, setSearchState) => {
  /*
  searchState: { tags: '', name: '', majors: [] or '', middles: [] or '', minors: [] or '', brands }
  setSearchState(searchDataList)
  */
  searchState.majors = searchState.majors.join(); // 리스트를 ,로 구분한 스트링으로 변경
  searchState.middles = searchState.middles.join();
  searchState.minors = searchState.minors.join();

  const url = process.env.REACT_APP_URL + '/clothes/search-clothes';
  axios.get(url, {
    params: searchState,
  })
  .then((res) => {
    let responseOK = res && res.status === 200 && res.statusText === 'OK'; // 200인 것만 확인하면 된다 아님?
    if (responseOK) {
      setSearchState(res.data);
    }
  });
}