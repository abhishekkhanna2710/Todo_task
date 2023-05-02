const router = require("express").Router();

const todoTask = require("../models/TaskSchema.js");

// Post Request
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

// Get Request
router.get("/", async (req, res) => {
    try {
        // res.send("Hello todo");
        const todos = await todoTask.find();
        return res.status(200).send(todos);

    } catch (error) {
        console.log(error)
    }
})


// Update request
router.put("/:id", async (req, res) => {
    try {
        const { title, desc, isCompleted } = req.body;
        const todo = await todoTask.findByIdAndUpdate(
            req.params.id,
            { title, desc, isCompleted },
            { new: true }
        );
        return res.status(200).send({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
    }
});

// Delete Request

router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await todoTask.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;