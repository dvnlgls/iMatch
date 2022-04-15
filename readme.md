# Find matching crew in multiple IMDb crew pages

> A quick hack solution inspired by the reddit post https://www.reddit.com/r/movies/comments/u35jgx/is_there_any_tool_out_there_that_quickly_filters/

## About this tool:
- A Node CLI to find common crew from a list of IMDb credit pages

## Installation:
- `npm i`

## Usage:
- In the `index.js`, add your IMDb urls to the `input` array
  - CAUTION: The url should be in this exact format: `https://www.imdb.com/title/tt0838221` (trailing slash is optional). Just change the title ID to suit your need.
- Run `npm start` or `node index.js`
- You can add any number of urls to compare. Be warned, if you add many unrelated titles, you're not likely to get a result (no common crew).

## Comments:
- On account of being a quick hack, the code is largely untested.
- Only the typical happy path is tested.
- Tested with movie full credit URLs. Behavior with other url types might be unpredictable.
- Feel free to file a bug.

> If you like this, check out my other useful project: https://theshowgrid.com/ (See IMDb ratings for all episodes of a TV show in a table)

&nbsp;

## Changelog:

### v1.1 (2022-04-15)
- Removed the requirement for trailing slash in the url
- Added a primitive validation to check the input urls
- Added a pretty tabular format for results
  - Result will be alphabetically sorted by first name
- Added a progress indicator while fetching urls

### v1 (2022-04-14)
- First release