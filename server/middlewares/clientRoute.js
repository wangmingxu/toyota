import routes from '@/Route';
import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import * as url from 'url';
import Html from '../Component/Html';
import createInjectorWithReq from '../Service';
import { genHtmlAssets } from '../utils/template';

const router = express.Router();

router.use(async (req, res) => {
  const { query, originalUrl } = req;
  const injector = createInjectorWithReq(req);
  const currentRoute = matchRoutes(routes, originalUrl.replace(url.parse(originalUrl).search, ''));
  // console.log(currentRoute);
  // 通过组件上的getInitialProps静态方法获取数据
  const promises = currentRoute
    .map(({ route, match }) =>
      route.component.getInitialProps
        ? route.component.getInitialProps({ injector, match, query })
        : null
    )
    .filter(item => !!item);
  try {
    const initialData = await Promise.all(promises);
    const context = {};
    const stream = ReactDOMServer.renderToNodeStream(
      <Html
        initialData={initialData}
        context={context}
        injector={injector}
        assets={genHtmlAssets()}
        originalUrl={req.originalUrl}
      />
    );
    stream.pipe(
      res,
      {
        end: false,
      }
    );
    stream.on('end', () => {
      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
      }
      res.end();
    });
  } catch (error) {
    console.log(error);
    // const err = error.stack || error.toString();
    res.render('index');
  }
});

export default router;
