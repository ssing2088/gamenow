const fs = require('fs');

// 读取游戏数据
const games = JSON.parse(fs.readFileSync('config/games.json', 'utf8'));

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// 首页
sitemap += '  <url>\n';
sitemap += '    <loc>https://gamenow.net/</loc>\n';
sitemap += '    <lastmod>2025-01-05</lastmod>\n';
sitemap += '    <changefreq>daily</changefreq>\n';
sitemap += '    <priority>1.0</priority>\n';
sitemap += '  </url>\n';

// 所有游戏页面
games.forEach(game => {
  if (game.name && game.url) {
    sitemap += '  <url>\n';
    sitemap += '    <loc>https://gamenow.net/game/' + game.url.replace('/', '') + '</loc>\n';
    sitemap += '    <lastmod>2025-01-05</lastmod>\n';
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  }
});

// 分类页面
const categories = [...new Set(games.filter(g => g.category).map(g => g.category))];
categories.forEach(category => {
  sitemap += '  <url>\n';
  sitemap += '    <loc>https://gamenow.net/category/' + category.toLowerCase().replace(/\s+/g, '-') + '</loc>\n';
  sitemap += '    <lastmod>2025-01-05</lastmod>\n';
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += '    <priority>0.7</priority>\n';
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

fs.writeFileSync('sitemap.xml', sitemap);
console.log('Enhanced sitemap created with', games.length, 'game URLs and', categories.length, 'category URLs');
