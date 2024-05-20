import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['example.com'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

export default nextConfig;
