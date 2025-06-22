import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['image.tmdb.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: 'https',
                hostname: 'fdb-tools.ru', // 👈 добавлен внешний источник для placeholder
            },
        ],
    },
};

export default nextConfig;
