import type { NextConfig } from 'next';

// @keep-sorted
const nextConfig: NextConfig = {
  /* config options here */
  // @keep-sorted
  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: true,
    },
  },
  output: 'export',
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
