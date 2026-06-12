import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export default client;
