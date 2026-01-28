import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from Backend/ directory
// path: Backend/src/config/loadEnv.js -> ../../.env resolves to Backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
