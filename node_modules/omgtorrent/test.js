const omgtorrent = require('./index.js');
const expect = require('expect.js');

describe('omgtorrent Test', () => {
  it('Astérix Search Test', () => {
    return omgtorrent.search({query: 'Astérix'}).then(data => {
      expect(data).to.be.an('object');
      expect(data.torrents[0].title).to.eql('Asterix Le Secret de la Potion Magique 2018 FRENCH BDRip XviD-EXTREME');
      expect(data.torrents[0].href).to.eql(
        'https://www.omgtorrent.cz/torrent/asterix-le-secret-de-la-potion-magique-2018-french-bdrip-xvid-extreme_75933.html',
      );
      expect(data.torrents[0].size).to.eql('694.85 MB');
      expect(data.torrents[0].category).to.eql('BDRip');
      expect(data.torrents.length).to.be.above(1);
    });
  });

  it('Avenger 3 Info Test', () => {
    return omgtorrent
      .info('https://www.omgtorrent.cz/torrent/avengers-3-infinity-war-2018-truefrench-bdrip-xvid-extreme_63278.html')
      .then(data => {
        expect(data).to.be.an('object');
        expect(data.title).to.eql('Avengers 3 Infinity War 2018 TRUEFRENCH BDRip XviD-EXTREME');
        expect(data.type).to.eql('films');
        expect(data.size).to.eql('1.37 GB');
        expect(data.imdb_id).to.eql('tt4154756');
        expect(data.infohash).to.match(/^B2B[A-Z0-9]{34}A73$/);
      });
  });
});
