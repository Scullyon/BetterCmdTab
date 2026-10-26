import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Served from bettercmdtab.app/docs, merged into the marketing site's export
  // at deploy time. basePath prefixes every generated URL — pages, assets and
  // /_next/* — so the two static trees share one origin without colliding.
  basePath: '/docs',
  output: 'export',
  // Every page ships as <dir>/index.html, which web/serve.ts serves for the
  // slashed URL and 301s the bare one to.
  trailingSlash: true,
  // No server at runtime, so no image optimizer: assets must ship pre-sized.
  images: { unoptimized: true },
};

export default withNextIntl(withMDX(config));
