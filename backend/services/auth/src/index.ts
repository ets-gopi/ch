import app from "./app";
import AuthEnvVars from "../config/envConfig";
const PORT = new AuthEnvVars().get("PORT");

app.listen(PORT, () => {
  console.log(`auth service running on port ${PORT}`);
});
