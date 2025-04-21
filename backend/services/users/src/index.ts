import app from "./app";
import { EnvVars } from "@common/config/src";
const PORT = new EnvVars().get("PORT") || 3001;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
