import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('I1CQOYS68C', 'eac7b807c0109771a245855c7501fca3');
const index = client.initIndex('stg_choicemarket_products');

const search = (query, resultsCallback, errorCallback) => {
    index.search(query)
         .then(({ hits }) => resultsCallback(hits))
         .catch(error => errorCallback(`Something went wrong! ${error}`));
};

export default search;
