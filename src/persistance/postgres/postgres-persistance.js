import config from '../../../config.js';

import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

function escapeIdentifier(identifier) {
  //console.log(identifier);
  return `"${identifier.replace(/"/g, '""').replace(/\./g, '"."')}"`;
}

/**
 * Creates a Postgres batch persister. This is used by the
 * `data` api routes.
 * @param {string} uri Postgres connection URI
 */
export const createPostgresPersister = async (uri) => {
  console.debug('Using Supabase Persister');

  const supabaseUrl = config.supabase.url;
  const supabaseKey = config.supabase.publicKey;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const email = config.supabase.email;
  const password = config.supabase.password;

  return {
    /**
     * @type {import('../persister-factories.js').BatchPersister}
     */
    updateBatch: async (batch) => {
      // login
      await supabaseLogin();
      try {
        for (let op of batch) {
          const table = escapeIdentifier(op.table);

          if (op.op == 'PUT') {
            const data = op.data;
            const with_id = { ...data, id: op.id ?? op.data.id };
            const timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
            const task = with_id.task;
            const is_complete = with_id.is_complete;
            const modified_at = timestamp;
            const user_id = with_id.user_id;

            
            await getSession();

            //upsert statment
            const insertTask = await supabase.from(table.replace(/['"]+/g, '')).upsert([
              {
                task,
                is_complete,
                modified_at,
                user_id
              }
            ]);
          } else if (op.op == 'PATCH') {
            const data = op.data;
            const with_id = { ...data, id: op.id ?? data.id };

            // login
            await getSession();
           

            // await client.query(statement, [JSON.stringify(with_id)]);
            const isComplete = with_id.is_complete;
            const id = with_id.id;

            //update
            const updateTask = await supabase
              .from(table.replace(/['"]+/g, ''))
              .update({ is_complete: isComplete })
              .eq('id', id);
          } else if (op.op == 'DELETE') {
            const id = op.id ?? op.data?.id;

            // login
            await getSession();
            const deleteTask = await supabase.from(table.replace(/['"]+/g, '')).delete().eq('id', id);
          }
        }
      } catch (e) {
        throw e;
      }

      async function supabaseLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          throw error;
        }
      }

      async function getSession() {
        const { data } = await supabase.auth.getSession();
        return data;
      }
    }
  };
};
