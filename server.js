const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const { join } = require('path')
const { parse } = require('url')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());
    
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    server.get('/signin', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.get('/signup', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.get('*', (req, res) => {
      //https://github.com/hanford/next-offline/blob/master/packages/now1-example/server.js
      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)
        app.serveStatic(req, res, filePath)
      } 
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });