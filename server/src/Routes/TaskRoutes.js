const router = require("express").Router();

const todoTask = require("../models/TaskSchema.js");

router.post("/", async (req, res) => {

    const routesArray = req.body;
    try {

        if (!Array.isArray(routesArray)) {
            return res.status(400).send({ message: "Routes should be an array" });
        }
        for (const task of routesArray) {
            const { userId, title, desc, isCompleted } = task;
            const data = new todoTask({ userId, title, desc, isCompleted });
            await data.save();
        }

        return res.status(200).send({ message: "todos saved successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });

    }
})


router.get("/", async (req, res) => {
    try {
        // res.send("Hello todo");
        const todos = await todoTask.find();
        return res.status(200).send(todos);

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;