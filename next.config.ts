import type { NextConfig } from "next";

// Bundler: Webpack (opt-in via `--webpack` on dev/build scripts).
// CSS: Tailwind v4 through PostCSS (`postcss.config.mjs` -> @tailwindcss/postcss).
const nextConfig: NextConfig = {
  output:"standalone",
  // Demo build: hotlinked Unsplash porthole photos, no optimizer pipeline needed
  images: { unoptimized: true },
};

export default nextConfig;
