const { build } = require("esbuild")
const chokidar = require("chokidar")
const liveServer = require("live-server")

;(async () => {
  const builder = await build({
    bundle: true,
    define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
    entryPoints: ["src/index.jsx"],
    incremental: true,
    minify: process.env.NODE_ENV === "production",
    outfile: "public/bundle.js",
  })
  // `chokidar` watcher source changes.
  chokidar
    // Watches TypeScript and React TypeScript.
    .watch("src/**/*.{js,jsx}", {
      interval: 0, // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on("all", () => {
      builder.rebuild()
    })
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: true,
    // Uses `PORT=...` or 8080 as a fallback.
    port: +process.env.PORT || 8080,
    // Uses `public` as the local server folder.
    root: "public",
  })
})()
