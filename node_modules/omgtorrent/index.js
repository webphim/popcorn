/**!
 * omgorrent
 * @author Persei08
 * @author c0b41 <cobaimelan@protonmail.ch>
 * @license MIT
 */

const cheerio = require('cheerio'),
  got = require('got'),
  url = 'https://www.omgtorrent.cz',
  validTypes = new Set([
    'films',
    'series',
    'jeux',
    'logiciels',
    'albums',
    'ebooks',
  ]),
  validOrder = new Set(['rls', 'id_cat', 'id', 'time_maj', 'taille', 'seeders', 'leechers', 'downloaded', 'top', 'vues']),
  validOrderBy = new Set(['desc', 'asc']);

/**
 * @method search
 * @desc omgtorrent search method
 * @param {object} opt - example {query:"Fight Club"}
 * @returns {function} promise
 */
const search = opt => {
  opt.type = validTypes.has(opt.type) ? opt.type : null;
  opt.order = validOrder.has(opt.order) ? opt.order : 'seeders';
  opt.orderBy = validOrderBy.has(opt.orderBy) ? opt.orderBy : 'desc';

  let reqUrl = `${opt.url || url}/recherche/?${
    opt.type ? 's_' + opt.type + '=on&' : ''
    }order=${opt.order}&orderBy=${opt.orderBy
    }&query=${encodeURIComponent(opt.query)
    }&page=${opt.page || 1}`;


  return got(reqUrl).then(data => {
    let $ = cheerio.load(data.body);

    let table = $('div.t-details');

    let torrents = [];

    table.each((i, elem) => {
      let chunk = cheerio.load(elem);

      torrents.push({
        title: chunk('.t-rls').text(),
        category: chunk('.t-categorie a').attr('title').slice(23),
        href: `${opt.url || url }`+chunk('a')
          .eq(1)
          .attr('href'),
        seed: chunk('.t-sources').text(),
        leech: chunk('.t-clients').text(),
        size: chunk('.t-taille')
          .children()
          .remove()
          .end()
          .text(),
      });
    });

    return {domain: opt.url || url, query: opt.query, torrents};
  });
};

/**
 * @method info
 * @desc omgtorrent info method
 * @param {string} url - example http://1337x.org/torrent/738327/New-Girl-S03E14-HDTV-x264-LOL/
 * @returns {function} promise
 */

const info = url => {
  return got(url).then(data => {
    let $detail = cheerio.load(data.body);
    let $content = cheerio.load($detail.html());

    let info = {};

    info.title = $detail('title').text().trim();

    info.title = info.title
      .slice(12)
      .substring(0, info.title.length - 39)
      .trim();

    try{
      $stats = cheerio.load(
        $content('#statistiques-torrent').html()
      );
    }catch (e){
      try{
        $msg_err = cheerio.load(
          $content('div#corps p.message.erreur').eq(1).html()
        );
        console.error('Error: DMCA / Copyright notice.\n', $msg_err.text());
      }catch(e){
        console.error('Error while trying to get $stats or detect DMCA message: ', e);
      }
      return null;
    }

    $stats_categorie = cheerio.load(
      $stats('.stats-categorie').html()
    );

    $stats_tech = cheerio.load(
      $stats('.stats-tech').html()
    );
    $stats_infos = cheerio.load(
      $stats('.stats-infos').html()
    );


    info.type = $stats_categorie('a.btn.tags').eq(0)
      .text()
      .trim();
    info.category = $stats_categorie('a.btn.tags').eq(1)
      .text()
      .trim();
    info.size = $stats_categorie('.stats-taille')
      .children('span')
      .text()
      .trim();
    info.downloads = $stats_infos('.telecharges')
      .children('span')
      .eq(1)
      .text()
      .slice(18)
      .replace(/,/g, '')
      .trim();
    info.last_check = $stats_tech('.stats-last-maj')
      .children('span')
      .text()
      .slice(7)
      .trim();
    info.date_uploaded = $stats_tech('.stats-date-ajout')
      .children('span')
      .text()
      .slice(7)
      .trim();
    info.seeders = $stats_infos('.stats-sources')
      .children('span')
      .text()
      .slice(10)
      .replace(/,/g, '')
      .trim();
    info.leechers = $stats_infos('.stats-clients')
      .children('span')
      .text()
      .slice(10)
      .replace(/,/g, '')
      .trim();
    info.infohash = $content('#hash-du-torrent > p > strong')
      .text()
      .trim();
    info.real_name = $content('#liste-fichiers li.liste-fichiers-li div.liste-fichiers .liste-fichiers-taille-rls')
      .eq(0)
      .text()
      .trim();

    imdb_link = $content("#photos div a[href^='https://www.imdb.com']").attr('href');
    imdb_link ? info.imdb_id = imdb_link.match(/\/(tt\d+)\//)[1] : '';

    trackers = [];
    $trackers = cheerio.load(
      $content('#liste-des-trackers div.trackers').html()
    );
    $trackers('div.trackers-infos').each((i, el) => {
      trackers.push({
        announce:   encodeURIComponent($trackers('div.trackers-infos').eq(i).children('div').eq(0).text().trim()),
        seeders:    $trackers('div.trackers-infos').eq(i).children('div').eq(1).text().replace(/,/g, '').replace(/—/g, '0').trim(),
        });
    });

    var sortBySeeders = function (arr) {
        return arr.sort(function (a, b) {
            return b.seeders - a.seeders;
        });
    };
    var ignoreTrackersWithoutStats = function (arr) {
      return arr.filter(function (ele) {
        return ele.seeders && ele.leechers != 0
      });
    };
    var best_trackers = '&tr=' + sortBySeeders(ignoreTrackersWithoutStats(trackers)).map(t => t.announce).join('&tr=');

    info.download = {
      magnet: 'magnet:?xt=urn:btih:' + info.infohash + '&dn='+encodeURIComponent(info.real_name.replace(/\ /g, '.')) + best_trackers,
    };

    info.files = [info.real_name];
    $content('ul#collapseFichiersTorrent li.liste-fichiers-li').each((i, el) => {
      info.files.push(
        $content('ul#collapseFichiersTorrent li.liste-fichiers-li')
          .eq(i)
          .children('div')
          .eq(1)
          .text()
          .trim(),
      );
    });
    return info || null;
  });
};

module.exports.search = search;
module.exports.info = info;