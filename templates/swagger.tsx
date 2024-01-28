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

const ScopedScript = () =>
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
  </script>`;

const Script: FC = memo(() => (
  <>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js"></script>
    <ScopedScript />
  </>
));

const Head: FC = memo(() => (
  <head>
    <meta charset="UTF-8" />
    <title>Swagger UI</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css"
    />
  </head>
));

const Body: FC = memo(() => (
  <body style={bodyStyle}>
    <div id="swagger-ui"></div>
  </body>
));

const SwaggerUI: FC = () => (
  <html style={htmlStyle}>
    <Head />
    <Body />
    <Script />
  </html>
);

export default <SwaggerUI />;
