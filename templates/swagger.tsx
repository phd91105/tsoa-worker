import { html } from 'hono/html';
import { type FC, memo } from 'hono/jsx';

const htmlStyle = {
  boxSizing: 'border-box',
  overflow: '-moz-scrollbars-vertical',
  overflowY: 'scroll'
};

const bodyStyle = {
  margin: 0,
  background: '#fafafa'
};

const ScopedScript: FC = memo(
  () =>
    html`<script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: '/docs/spec',
          dom_id: '#swagger-ui',
          deepLinking: true,
          tagsSorter: 'alpha',
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          layout: 'StandaloneLayout'
        });
      };
    </script>`
);

const Script: FC = memo(() => (
  <>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.2/swagger-ui-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.2/swagger-ui-standalone-preset.js"></script>
    <ScopedScript />
  </>
));

const Head: FC = memo(() => (
  <head>
    <meta charset="UTF-8" />
    <title>Swagger UI</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.2/swagger-ui.min.css"
    />
  </head>
));

const Body: FC = memo(() => (
  <body style={bodyStyle}>
    <div id="swagger-ui"></div>
  </body>
));

const SwaggerUI: FC = memo(() => (
  <html style={htmlStyle}>
    <Head />
    <Body />
    <Script />
  </html>
));

export default <SwaggerUI />;
