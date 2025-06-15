const Event = require("../models/event.model");

exports.addEvent = async (req, res, next) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: "Event added successfully", event });
    } catch (err) {
        next(err);
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event updated", event });
    } catch (err) {
        next(err);
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event deleted" });
    } catch (err) {
        next(err);
    }
};

exports.getEventsWithCapacityGreaterThan50 = async (req, res, next) => {
    try {
        const events = await Event.find({ capacity: { $gt: 50 } });
        res.json(events);
    } catch (err) {
        next(err);
    }
};

exports.getEventsWithCapacityLessThan30 = async (req, res, next) => {
    try {
        const events = await Event.find({ capacity: { $lt: 30 } });
        res.json(events);
    } catch (err) {
        next(err);
    }
};

exports.getPaginatedEvents = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const skip = parseInt(req.query.skip) || 0;
        const events = await Event.find().skip(skip).limit(limit);
        res.json(events);
    } catch (err) {
        next(err);
    }
};
