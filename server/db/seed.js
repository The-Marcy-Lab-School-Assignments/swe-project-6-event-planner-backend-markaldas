const bcrypt = require('bcrypt');
const pool = require('./pool'); 

const SALT_ROUNDS = 8;

const seed = async () => {
    await pool.query('DROP TABLE IF EXISTS rsvps');
    await pool.query('DROP TABLE IF EXISTS events');
    await pool.query('DROP TABLE IF EXISTS users');

    await pool.query(`CREATE TABLE users (
       user_id SERIAL PRIMARY KEY,
       username TEXT UNIQUE NOT NULL,
       password_hash TEXT NOT NULL
        )`);
    
    await pool.query(`CREATE TABLE events (
        event_id SERIAL PRIMARY KEY, 
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        location TEXT NOT NULL, 
        event_type TEXT NOT NULL,
        max_capacity INT NOT NULL,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE
        )`);

        await pool.query(`CREATE TABLE rsvps (
            rsvp_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            UNIQUE (user_id, event_id)
            )`);

            const evelinHash = await bcrypt.hash('evil123', SALT_ROUNDS);
            const markHash = await bcrypt.hash('imadumbahh', SALT_ROUNDS);
            const eveHash = await bcrypt.hash('walle', SALT_ROUNDS);

            const insertUserQuery = `INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING user_id;`;
        const evelinResponse = await pool.query(insertUserQuery, ['Evelin Aldas', eveHash]);
        const markResponse = await pool.query(insertUserQuery, ['Mark Aldas', markHash]);
        const eveResponse = await pool.query(insertUserQuery, ['Eve', eveHash]);

        const evelinId = evelinResponse.rows[0].user_id;
        const markId = markResponse.rows[0].user_id;
        const eveId = eveResponse.rows[0].user_id;

        const insertEventsQuery = `INSERT INTO events (title, description, date, location, event_type, max_capacity, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING event_id`;
        const evelinEventResponse = await pool.query(insertEventsQuery, ['Dog Food', 'Come say hi to some of our dogs and donate some money to the cause!', '05-10-2026', 'New York, Valley Stream', 'fundraiser', 100, evelinId]);
        const markEventResponse = await pool.query(insertEventsQuery, ['Tennis Game', 'Lets go out and play some tennis with friends!', '05-29-2026', 'New York, Brooklyn', 'sports', 8, markId]);
        const eveEventResponse = await pool.query(insertEventsQuery, ['Earth Day', 'Come to earth to re-plant the planet!', '05-16-9245', 'Earth', 'other', 1000000000, eveId]);

        const evelinEventId = evelinEventResponse.rows[0].event_id;
        const markEventId = markEventResponse.rows[0].event_id;
        const eveEventId = eveEventResponse.rows[0].event_id; 
        
        const insertRsvpsQuery = `INSERT INTO rsvps (user_id, event_id) VALUES ($1, $2);`

        await pool.query(insertRsvpsQuery, [evelinId, markEventId]);
        await pool.query(insertRsvpsQuery, [markId, evelinEventId]);
        await pool.query(insertRsvpsQuery, [evelinId, eveEventId]);
        
}

seed()

  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  })
  .finally(() => pool.end());