import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import urlRegex from 'url-regex';
import { table } from 'table';

async function main() {
  // These URLs are used to test this tool. Replace with your own URLs. 
  const input = ['https://www.imdb.com/title/tt0838221', 'https://www.imdb.com/title/tt8847712/', 'https://www.imdb.com/title/tt0265666'];

  const idArrays = []; // will be an array of arrays. An array for each url containing the nameIds
  let commonIds = [];
  const nameIdReference = new Map(); // reference: nameId -> name

  if (!validateURLs(input)) {
    return;
  }

  for (let i = 0; i < input.length; i++) {
    console.log('Processing url: ' + (i + 1) + '/' + input.length);

    let url = input[i];
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += 'fullcredits/';

    const document = await getdocumentFromUrl(url);
    const anchors = document.getElementById('main').getElementsByTagName('a');
    processAnchors(anchors, nameIdReference, idArrays);
  }

  // find unique IDs in all the arrays
  commonIds = idArrays.reduce((p, c) => {
    return p.filter(e => c.includes(e));
  });

  printResult(commonIds, nameIdReference);
}

function printResult(commonIds, nameIdReference) {

  if (commonIds.length === 0) {
    console.log('No common crew found');
    return;
  }

  const prettyResult = [];
  const tableConfig = {
    spanningCells: [
      { col: 0, row: 0, colSpan: 2 }
    ]
  }

  console.log('\n');

  for (const id of commonIds) {
    const url = 'https://www.imdb.com/name/' + id + '/';

    // replace all trailing new lines from the name
    const crewName = nameIdReference.get(id).replace(/\n+$/, "").trim();
    prettyResult.push([crewName, url]);
  }

  prettyResult.sort((a, b) => {
    const nameA = a[0].toUpperCase(); // ignore upper and lowercase
    const nameB = b[0].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  // result table headers.  Order matters, since we're unshifting
  prettyResult.unshift(['Name', 'URL']);
  prettyResult.unshift(['Common Crew', '']);

  console.log(table(prettyResult, tableConfig));
}

function validateURLs(urls) {
  if (urls.length === 0) {
    console.error('Error: Add some IMDb title URLs to the input array & run again.');
    return false;
  }

  for (const url of urls) {
    const validURL = urlRegex({ exact: true }).test(url) && url.indexOf('http') === 0;
    const imdbCheck = url.includes('imdb.com/title/'); // primitive check. 

    if (!validURL || !imdbCheck) {
      console.error('Error: Invalid URL: ' + url);
      console.error('URL should look like: ' + 'https://www.imdb.com/title/tt0838221/' + '\n');
      return false;
    }
  }

  return true;
}

function processAnchors(anchors, nameIdReference, idArrays) {
  const ids = [];

  for (let a of anchors) {
    let href = a.getAttribute('href');
    if (href.includes('/name/') && !a.innerHTML.includes('<img')) {
      const name = a.innerHTML;
      const nameId = href.split('/')[2];

      if (ids.indexOf(nameId) === -1) {
        ids.push(nameId);
      }

      // update the reference map
      if (!nameIdReference.has(nameId)) {
        nameIdReference.set(nameId, name);
      }
    }
  }

  idArrays.push(ids);
}

async function getdocumentFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);
  return dom.window.document;
}


main();

