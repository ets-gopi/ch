import app from './app';
import EnvVars from '../config/envConfig';
const PORT = new EnvVars().get('PORT');

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
