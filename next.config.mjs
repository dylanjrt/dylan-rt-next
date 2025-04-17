/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVG Configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Add global revalidation settings
  experimental: {
    // Defaults for all pages
    serverActions: {
      // Default revalidation time for all routes in seconds
      defaultRevalidation: 300, // 5 minutes
    },
  },
};

export default nextConfig;
