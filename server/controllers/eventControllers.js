const eventModel = require('../models/eventModel');

const listEvents = async (req, res, next) => {
    try {
        const events = await eventModel.list();
        res.status(200).send(events);
    } catch (err) {
        next(err);
    } 
};

const createEvent = async (req, res, next) => {
    try {
        const eventTypesArr = [
            'conference',
            'workshop',
            'social',
            'networking',
            'concert',
            'sports',
            'fundraiser',
            'other'
        ];
        const { title, description, date, location, event_type, max_capacity} = req.body;
        if(!title || !date || !location || !max_capacity || !event_type || !eventTypesArr.includes(event_type.toLowerCase()) ) {
            return res.status(400).send({ message: 'missing fields or invalid event type'});
        } 
        const { userId } = req.session;
        const event = await eventModel.create(title, description, date, location, event_type, max_capacity, userId);
        res.status(201).send(event);
    } catch (err) {
        next(err);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const eventId = Number(req.params.event_id);

        const exisiting = await eventModel.find(eventId);
         
        if(!exisiting) {
            return res.status(404).send({ message: 'Event not found'});
        }

        if(exisiting.user_id !== req.session.userId) {
            return res.status(403).send({ message: 'You can only update your own events'});
        }

        const {title, description, date, location, event_type, max_capacity} = req.body;
        const event = await eventModel.update(title, description, date, location, event_type, max_capacity, eventId);
        return res.status(200).send(event);
    } catch (err) {
        next(err);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const eventId = Number(req.params.event_id);

        const exisiting = await eventModel.find(eventId);
         
        if(!exisiting) {
            return res.status(404).send({ message: 'Event not found'});
        }

        if(exisiting.user_id !== req.session.userId) {
            return res.status(403).send({ message: 'You can only update your own events'});
        }

        const event = await eventModel.destroy(eventId);
        res.status(200).send(event);
    } catch (err) {
        next(err);
    }
};

const listUserEvents = async (req, res, next) => {
    try {
        const userId = Number(req.params.user_id);
        const events = await eventModel.listByUser(userId);
        res.status(200).send(events);
    } catch (err) {
        next(err);
    }
}

module.exports = { listEvents, createEvent, updateEvent, deleteEvent, listUserEvents };


