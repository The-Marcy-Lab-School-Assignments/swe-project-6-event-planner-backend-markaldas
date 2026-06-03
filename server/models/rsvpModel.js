const pool = require('../db/pool');

module.exports.create = async (event_id, user_id) => {
    const query = `INSERT INTO rsvps (event_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING rsvp_id, event_id, user_id;`
    const { rows } = await pool.query(query, [event_id, user_id]);
    return rows[0] || null;
};

module.exports.destory = async (user_id, event_id) => {
    const query = `DELETE FROM rsvps WHERE user_id = $1 AND event_id = $2 RETURNING rsvp_id, user_id, event_id;`
    const { rows } = await pool.query(query, [user_id, event_id]);
    return rows[0] || null;
};

module.exports.listUserRsvps = async (user_id) => {
    const query = `SELECT events.*, users.username FROM users INNER JOIN events ON users.user_id = events.user_id INNER JOIN rsvps ON events.event_id = rsvps.event_id WHERE rsvps.user_id = $1;`
    const { rows } = await pool.query(query, [user_id]);
    return rows;
};