import 'dotenv/config';
6465
const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 6060,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    uri: process.env.DATABASE_URI
  },
  powersync: {
    url: process.env.POWERSYNC_URL,
    publicKey: process.env.POWERSYNC_PUBLIC_KEY,
    privateKey: process.env.POWERSYNC_PRIVATE_KEY,
    jwtIssuer: process.env.JWT_ISSUER
  },
  supabase: {
    url: process.env.PUBLIC_SUPABASE_URL,
    publicKey: process.env.SUPABASE_ANON_KEY,
    email: process.env.SUPABASE_EMAIL,
    password: process.env.SUPABASE_PASS
  }
};

export default config;
