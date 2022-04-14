import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

async function main() {

  // These URLs are used to test this tool. Replace with your own URLs. TRAILING SLASH is required.
  const input = ['https://www.imdb.com/title/tt0838221/', 'https://www.imdb.com/title/tt8847712/', 'https://www.imdb.com/title/tt0265666/'];

  const idArrays = []; // will be an array of arrays. An array for each url containing the nameIds
  let commonIds = [];
  const nameIdReference = new Map(); // reference: nameId -> name

  for (const url of input) {
    const document = await getdocumentFromUrl(url + 'fullcredits/');
    const anchors = document.getElementById('main').getElementsByTagName('a');
    processAnchors(anchors, nameIdReference, idArrays);
  }

  // find unique in all
  commonIds = idArrays.reduce((p, c) => {
    return p.filter(e => c.includes(e));
  });

  console.log('Common crew:');

  for (const id of commonIds) {
    const url = 'https://www.imdb.com/name/' + id + '/';
    console.log(url, nameIdReference.get(id));
  }

  if(commonIds.length === 0) {
    console.log('No common crew found');
  }

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

