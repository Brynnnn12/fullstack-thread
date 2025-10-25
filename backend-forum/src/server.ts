import 'dotenv/config';

import app from "./config/app.js";
import { config } from "./config/config.js";

const PORT = config.port || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT} dalam mode ${config.nodeEnv}`);
});