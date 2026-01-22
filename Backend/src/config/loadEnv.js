import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the parent directory (Backend/)
// path: Backend/src/config/loadEnv.js -> ../../.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
