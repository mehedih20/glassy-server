import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Glassy server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

// Gracefully handling unhandledRejection error
process.on("unhandledRejection", () => {
  console.log("unhandledRejection detected, shutting down server.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Gracefully handling uncoughtException error
process.on("uncaughtException", () => {
  console.log("uncaughtException detected, shutting down server.");
  process.exit();
});
