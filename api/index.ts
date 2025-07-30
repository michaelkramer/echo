import fs from "fs";
import path from "path";
import express, { urlencoded, json } from "express";
import swaggerUi from "swagger-ui-express";
import analyticController from "./controllers/analytic-data";
import pingController from "./controllers/ping";
import env from "./env";
export const app = express();

export function swaggerDocument() {
  const file = fs.readFileSync(
    path.join(__dirname, "../public/swagger-output.json"),
    "utf8",
  );
  return JSON.parse(file);
}

console.log("Starting Echo API server...");

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

// Configure CORS to specifically allow localhost
// const corsOptions = {
//   origin: "http://localhost:5173", // Replace 3000 with the actual port of your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
//   credentials: true, // Allow sending cookies/authentication headers
// };

// app.use(cors(corsOptions));

const port = env.PORT || 3000;

// [START routes]

app.use("/api", [pingController, analyticController]);

console.log("API routes initialized.");
app.get("/api", async (_req: any, res: any) => {
  res.send("Hello, this is a test response from the root endpoint.");
});
if (process.env.NODE_ENV === "development") {
  // Serve Swagger UI
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument()));
}
// [END routes]

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});

module.exports = app;
