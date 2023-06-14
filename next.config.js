/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.wikia.nocookie.net", "static.tvtropes.org"],
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
};

module.exports = nextConfig;
