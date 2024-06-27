import withPWAInit, { runtimeCaching } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    reactStrictMode: true,
    output: 'export',
    fallbacks: {
        document: "/~offline",
        data: "/fallback.json",
        image: "/fallback.webp",
        audio: "/fallback.mp3",
        video: "/fallback.mp4",
        font: "/fallback-font.woff2",
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        runtimeCaching,
        buildExcludes: [/middleware-manifest.json$/],
    },
    customWorkerSrc: "service-worker",
    customWorkerDest: "somewhere-else",
    customWorkerPrefix: "not/a-worker",
});

export default withPWA({});
