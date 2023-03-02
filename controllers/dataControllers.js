const mongoose = require('mongoose');

exports.getData = async (req, res) => {
    try {
        const filter = {};
        const { end_year, topic, sector, region, source, country } = req.query;

        if (end_year) filter.end_year = +end_year;
        if (topic) filter.topic = topic;
        if (sector) filter.sector = sector;
        if (region) filter.region = region;
        if (source) filter.source = source;
        if (country) filter.country = country;

        const collection = mongoose.connection.collection('data');
        const data = await collection
            .find(filter)
            .collation({ locale: 'en', strength: 2 })
            .toArray();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
