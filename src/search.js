const headers = {
  "Connection": "keep-alive",
  "Accept": "application/json",
  "Accept-Encoding": "gzip, deflate, br",
};

const urlParams = query => ({
  "x-algolia-application-i": "I1CQOYS68C",
  "x-algolia-api-key": "eac7b807c0109771a245855c7501fca3",
  "hitsPerPage": 5,
  query
});

const getSearchURL = (query) => {
  let url = new URL(`https://i1cqoys68c-dsn.algolia.net/1/indexes/stg_choicemarket_products/query`);
  const params = urlParams(query);
  Object.keys(params(query)).forEach(key => url.searchParams.append(key, params[key]));
  return url;
};

const search = (query, resultsCallback, errorCallback) => {
  const url = getSearchURL(query);

  fetch(url, { headers })
    .then((response) => response.json())
    .then(({ data }) => resultsCallback(data))
    .catch((error) => errorCallback(`Something went wrong! ${error}`));
};

export default search;
