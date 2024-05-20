import path from 'path';
import { fileURLToPath } from 'url';

// Determine the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
