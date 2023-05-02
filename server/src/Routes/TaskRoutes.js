const router = require("express").Router();

const todoTask = require("../models/TaskSchema.js");

// Post Request
router.post('/', (req, res) => {
    const { userId, title, desc, isCompleted } = req.body;

    todoTask.create({
        userId,
        title,
        desc,
        isCompleted

    })
        .then((result) => {
            res.status(201).json({ message: 'Todo saved successfully', todo: result });
        })
        .catch((error) => {
            console.error('Error saving todo:', error);
            res.status(500).json({ error: 'An error occurred while saving the todo' });
        });
});

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