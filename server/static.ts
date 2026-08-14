import express, { type Express } from "express";
import compression from "compression";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(compression());

  // hashed build assets are immutable — cache hard
  app.use(
    "/assets",
    express.static(path.resolve(distPath, "assets"), {
      immutable: true,
      maxAge: "1y",
    }),
  );

  app.use(express.static(distPath, { maxAge: "1d" }));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
