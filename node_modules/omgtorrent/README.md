## OMGtorrent Unoffical api module (based on [xtorrent](https://www.npmjs.com/package/xtorrent))

## Install

```
npm install omgtorrent
```

## Usage

```js
const omgtorrent = require('omgtorrent');
```

## Search

### Simple search

```js
omgtorrent.search({query: 'Avenger Infinity War'}).then(data => {
  console.log(data);
});
```

### Advanced search

```js
omgtorrent
  .search({
    query: 'Asterix Obelix',
    type: 'films',
    orderBy: 'time',
    sortBy: 'desc',
    page: 2,
  })
  .then(data => {
    console.log(data);
  });
```

#### Parameters

**url**
{string} optional.
If you need to use custom domain.

**page**
{integer} optional.
If you need more results you can ask for page 2, etc. Default is 1.

**type**
{string} optional.
To search only in the specified type category.
Must be one of those values: 'films', 'series', 'jeux', 'logiciels', 'albums', 'ebooks'.

**order**
{string} optional.
To sort the results.
Must be one of those values: 'rls', 'id_cat', 'id', 'time_maj', 'taille', 'seeders', 'leechers', 'downloaded', 'top', 'vues'. Default is 'seeders'.

**orderBy**
{string} optional.
To sort the results.
Must be one of those values: 'desc', 'asc'. Default is 'desc'.

## İnfo

```js
omgtorrent
  .info(
    'https://www.omgtorrent.cz/torrent/avengers-3-infinity-war-2018-truefrench-bdrip-xvid-extreme_63278.html',
  )
  .then(data => {
    console.log(data);
  });
```
