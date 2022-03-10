//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios  = require('axios');
const { conn, Genre } = require('./src/db.js');
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const getGenreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    getGenreApi.data.results.map(async (genre) => {
      try {
        await Genre.findOrCreate( { where: { name: genre.name}})
      } catch (error) {
        console.log(error)
      }
    })
  });
});
