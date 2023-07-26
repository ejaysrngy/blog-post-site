/** @type {import('next').NextConfig} */


// this is a plugin for nextjs. 
// The default behavior is to remove all .less/.css/.scss/.sass/.styl imports from all packages in node_modules.
const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
  images: {
    domains: [
      "static.wikia.nocookie.net",
      "static.tvtropes.org",
      "firebasestorage.googleapis.com",
    ],
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
    "@mui/core/": {
      transform: "@material-ui/core/{{member}}",
    },
    "@mui/lab/": {
      transform: "@material-ui/lab/{{member}}",
    },
    "@mui/icons/?(((\\w*)?/?)*)": {
      transform: "@material-ui/icons/{{ matches.[1] }}/{{member}}",
    },
  },
  output: 'export',
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
});

module.exports = nextConfig;
