
export const getSearchSql = function (searchArray, colName) {
  if (typeof searchArray == 'undefined' || searchArray == null || searchArray == '')
    return false

  searchArray = searchArray.split(',')
  let search_sql = '( ';
  for (let i = 0; i < searchArray.length; i++) {
    if (i != searchArray.length - 1)
      search_sql += colName + '=\'' + searchArray[i] + '\' or ';
    else
      search_sql += colName + '=\'' + searchArray[i] + '\')';
  }
  return search_sql
}
