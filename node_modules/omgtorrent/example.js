const omgtorrent = require('./index.js');

(async () => {
  console.time('Sample results');
  // Simple search
  try {
    console.log(await omgtorrent.search({query: 'Asterix'}));
  } catch (error) {
    console.error(error);
  }

  // Advanced search
  try {
    console.log(
      await omgtorrent.search({
        query: 'Battlestar Galactica',
        type: 'films',
        orderBy: 'date',
        sortBy: 'desc',
      }),
    );
  } catch (error) {
    console.error(error);
  }

  // Info
  try {
    console.log('\n=======\n',
      await omgtorrent.info(
        'https://www.omgtorrent.cz/torrent/new-girl-s06-french-hdtv_54225.html',
        //'https://www.omgtorrent.cz/torrent/avengers-3-infinity-war-2018-truefrench-bdrip-xvid-extreme_63278.html',
      ),
    );
  } catch (error) {
    console.error(error);
  }

  console.timeEnd('Sample results');
})();
