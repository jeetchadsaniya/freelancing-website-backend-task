const tagModel = require("../models/tag-module");

const createTagController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ statusCode: 400, message: "name is required" });
      return;
    }
    const tag = await tagModel.findOne({ name });
    if (tag) {
      res.status(400).send({ statusCode: 404, message: "tag already exist" });
      return;
    }
    const newTag = await tagModel.create({name});
    res.status(201).send({
      statusCode: 201,
      data: newTag,
      message: "tagc create successfully",
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = Object.freeze({
  createTagController,
});
