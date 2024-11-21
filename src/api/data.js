import express from 'express';
import config from '../../config.js';
import { factories } from '../persistance/persister-factories.js';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.publicKey;
const supabase = createClient(supabaseUrl, supabaseKey);

const persistenceFactory = factories[config.database.type]; 

const { updateBatch } = await persistenceFactory(config.database.uri);

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
      const { data: {user}, error } = await supabase.auth.signUp({
          email,
          password,
      });

      if (error) {
          throw error;
      }

      console.log('User signed up:', user);

      const userId = uuidv4();

      console.log('Generated user ID:', userId);

      const { data, error: insertError } = await supabase
          .from('users')
          .insert([{ email, user_id: userId }]);
      
      if (insertError) {
          throw insertError;
      }

      console.log('User added to users table:', data);

      res.json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const { data: {session}, error } = await supabase.auth.signInWithPassword({
          email,
          password,
      });

      if (error) {
          throw error;
      }

      const userData = await supabase
          .from('users')
          .select('*')
          .eq('email', email);

      if (!userData) {
          throw new Error('User not found');
      }

      res.json({ user: userData, session });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

/**
 * Handle a batch of events.
 */
router.post('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  try {
    console.log(req.body.batch);
    await updateBatch(req.body.batch);

    res.status(200).send({
      message: `Batch completed`
    });
  } catch (e) {
    console.error('Request failed', e.stack);
    res.status(400).send({
      message: `Request failed: ${e.message}`
    });
  }
});

/**
 * Handle all PUT events sent to the server by the client PowerSync application
 */
router.put('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  try {
    console.log('req.body.data ->', req.body.data.id);
    await updateBatch([{ op: 'PUT', table: req.body.table, data: req.body.data }]);

    res.status(200).send({
      message: `PUT completed for ${req.body.table} ${req.body.data.id}`
    });
  } catch (e) {
    console.error(e.stack ?? e.message);
    res.status(400).send({
      message: `Request failed: ${e.message}`
    });
  }
});

/**
 * Handle all PATCH events sent to the server by the client PowerSync application
 */
router.patch('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  try {
    await updateBatch([{ op: 'PATCH', table: req.body.table, data: req.body.data }]);

    res.status(200).send({
      message: `PATCH completed for ${req.body.table}`
    });
  } catch (e) {
    console.error(e.stack ?? e.message);
    res.status(400).send({
      message: `Request failed: ${e.message}`
    });
  }
});

/**
 * Handle all DELETE events sent to the server by the client PowerSync application
 */
router.delete('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  const table = req.body.table;
  const data = req.body.data;

  if (!table || !data?.id) {
    res.status(400).send({
      message: 'Invalid body provided, expected table and data'
    });
    return;
  }

  await updateBatch([{ op: 'DELETE', table: table, data: data }]);

  res.status(200).send({
    message: `DELETE completed for ${table} ${data.id}`
  });
});

export { router as dataRouter };
