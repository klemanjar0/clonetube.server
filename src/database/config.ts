import { config as initialize_env } from 'dotenv';

initialize_env();

export default {
  db_url: `mongodb+srv://clonetube_admin:${process.env.DB_PASSWORD}@clonetubecluster.pojfc8g.mongodb.net/?retryWrites=true&w=majority`,
};
