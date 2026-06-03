const rsvpModel = require('../models/rsvpModel');

const createRsvps = async (req, res, next) => {
    try {
        const eventId = Number(req.params.event_id);
        const { userId } = req.session;
        
        const rsvp = await rsvpModel.create(eventId, userId);

        if(!rsvp) {
            return res.status(201).send(null);
        } 
        res.status(201).send(rsvp);

    } catch (err) {
        next(err);
    }
};

const deleteRsvp = async (req, res, next) => {
    try {
        const eventId = Number(req.params.event_id);
        const { userId } = req.session;

        const deletedRsvp = await rsvpModel.destory(userId, eventId);

        if(!deleteRsvp) {
            return res.status(200).send(null);
        }
        res.status(200).send(deletedRsvp);

    } catch(err) {
        next(err);
    }
};

const listUserRsvps = async (req, res, next) => {
    try {
        const userId = Number(req.params.user_id);

        const userRsvps = await rsvpModel.listUserRsvps(userId);

        res.status(200).send(userRsvps);
    } catch(err) {
        next(err);
    }
};

module.exports = { createRsvps, deleteRsvp, listUserRsvps };