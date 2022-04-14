# Find matching crew in multiple IMDb crew pages

> A quick hack solution inspired by the reddit post https://www.reddit.com/r/movies/comments/u35jgx/is_there_any_tool_out_there_that_quickly_filters/

## About this tool:
- Finds matching crew from a list of IMDb urls

## Installation:
- `npm i`

## Usage:
- In the `index.js`, add your IMDb urls to the `input` array
- CAUTION: The url should be in this exact format: `https://www.imdb.com/title/tt0838221/` including the trailing slash. Just change the title ID to suit your need.
- You can add any number of urls to compare. Be warned, if you add many unrelated titles, you're not likely to get a result.

## Comments:
- On account of being a quick hack, the code is largely untested.
- Only typical happy path is tested.
- Tested with movie titles. Behavior with other url types might be unpredictable.
- Feel free to file a bug

> If you like this, check out my other useful project: https://theshowgrid.com/ (See IMDb ratings for all episodes of a TV show in a table)
