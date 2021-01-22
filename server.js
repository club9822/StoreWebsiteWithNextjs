const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const { join } = require('path');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    // https://github.com/hanford/next-offline/blob/master/packages/now1-example/server.js
    server.get('/service-worker.js', (req, res) => {
      app.serveStatic(req, res, './.next/service-worker.js');
    });
    const serviceWorkers = [
      {
        filename: 'service-worker.js',
        path: './.next/service-worker.js',
      },
      {
        filename: 'firebase-messaging-sw.js',
        path: './static/firebase-messaging-sw.js',
      },
    ];

    serviceWorkers.forEach(({ filename, path }) => {
      server.get(`/${filename}`, (req, res) => {
        app.serveStatic(req, res, path);
      });
    });

    server.get('/signin', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.get('/signup', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.get('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) {
        console.log('log:::err::', err);
        // throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
