import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import AppServerModule from './src/main.server'; // default import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function app(): express.Express {
  const server = express();
  const browserDistFolder = resolve(__dirname, '../browser');
  const indexHtml = join(__dirname, 'index.server.html');

  // Configuración de Angular Universal
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Servir archivos estáticos
  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  // Renderizado de Angular
  server.get('*', (req, res, next) => {
    const { baseUrl } = req;

    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }] }, (err, html) => {
      if (err) {
        next(err);
      } else {
        res.send(html);
      }
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
