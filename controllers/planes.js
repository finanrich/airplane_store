const Plane = require("../modals/plane");
const router = require("../routes/planes");

const getPlanes = async (req, res) => {
    try {
        const planes = await Plane.find();

        res.status(200).json(planes);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось получить список самолетов, повторите попытку",
        });
    }
};

const createPlane = async (req, res) => {
    const errors = {};

    if (!req.body.name) {
        errors.name = { message: "Пожалуйста, укажите название" };
    }

    if (!req.body.price) {
        errors.price = { message: "Пожалуйста, укажите цену" };
    }

    if (!req.body.description) {
        errors.description = { message: "Пожалуйста, укажите описание" };
    }

    if (req.body.description && req.body.description.length > 700) {
        errors.description = { message: "Слишком длинное описание" };
    }

    if (!req.body.capacity) {
        errors.capacity = { message: "Пожалуйста, укажите вместимость" };
    }

    if (req.body.capacity && req.body.capacity.length > 2) {
        errors.capacity = { message: "Вместимость не может быть больше 99" };
    }

    if (!req.file) {
        errors.planeImage = { message: "Пожалуйста, добавьте фото самолета" };
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const { name, price, description, capacity } = req.body;

        const plane = await Plane.create({
            name,
            price,
            description,
            capacity,
            planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
        });

        res.status(201).json(plane);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось создать самолет, повторите попытку",
        });
    }
};

module.exports = {
    getPlanes,
    createPlane,
};
