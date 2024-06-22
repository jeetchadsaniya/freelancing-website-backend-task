const projectModel = require("../models/project-model");
const tagModel = require("../models/tag-module");

const createProjectController = async (req, res) => {
  try {
    const { name, price, tags } = req.body;
    if (!name) {
      res.status(400).send({ statusCode: 400, message: "name is required" });
      return;
    }
    if (!price) {
      res.status(400).send({ statusCode: 400, message: "price is required" });
      return;
    }
    if (!tags) {
      res.status(400).send({ statusCode: 400, message: "tags is required" });
      return;
    }
    const isProjectExist = await projectModel.findOne({
      createdBy: req.user._id,
      name,
    });
    if (isProjectExist) {
      res.status(400).send({
        statusCode: 400,
        message: "project already exist with same name",
      });
      return;
    }
    const tagsArray = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = await tagModel.findOne({ name: tags[i] });
      tagsArray.push(tag._id);
    }

    const project = await projectModel.create({
      name,
      price,
      tags: tagsArray,
      createdBy: req.user._id,
      status: "notAssigned",
    });
    res.status(201).send({
      statusCode: 201,
      data: project,
      message: "project create successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const updateProjectController = async (req, res) => {
  try {
    const { name, price, tags, status, assignTo } = req.body;
    const { id } = req.params;
    if (!name) {
      res.status(400).send({ statusCode: 400, message: "name is required" });
      return;
    }
    if (!price) {
      res.status(400).send({ statusCode: 400, message: "price is required" });
      return;
    }
    if (!tags) {
      res.status(400).send({ statusCode: 400, message: "tags is required" });
      return;
    }
    if (!status) {
      res.status(400).send({ statusCode: 400, message: "status is required" });
      return;
    }
    if (status !== "notAssigned" && !assignTo) {
      res
        .status(400)
        .send({ statusCode: 400, message: "assignTo is required" });
      return;
    }

    const checkProjectExist = await projectModel.findById(id);
    if (!checkProjectExist) {
      res.status(404).send({
        statusCode: 404,
        message: "project dont exist",
      });
      return;
    }

    const isProjectExistWithSameName = await projectModel.findOne({
      createdBy: req.user._id,
      name,
    });
    if (isProjectExistWithSameName) {
      res.status(400).send({
        statusCode: 400,
        message: "project already exist with same name",
      });
      return;
    }
    const tagsArray = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = await tagModel.findOne({ name: tags[i] });
      tagsArray.push(tag._id);
    }

    const project = await projectModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        tags: tagsArray,
        createdBy: req.user._id,
        status,
        assignTo: status === "notAssigned" ? null : assignTo,
      },
      { new: true }
    );
    res.status(201).send({
      statusCode: 201,
      data: project,
      message: "project uodate successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      res.status(404).send({
        statusCode: 404,
        message: "project dont exist",
      });
      return;
    }
    res.status(200).send({
      statusCode: 200,
      data: project,
      message: "project get successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findByIdAndDelete(id);
    if (!project) {
      res.status(404).send({
        statusCode: 404,
        message: "project dont exist",
      });
      return;
    }
    res.status(200).send({
      statusCode: 200,
      data: project,
      message: "project delete successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getAllProjectController = async (req, res) => {
  try {
    const projects = await projectModel.find({ createdBy: req.user._id });
    res.status(200).send({
      statusCode: 200,
      data: projects,
      message: "projects get successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const getProjectsByTagsController = async (req, res) => {
  try {
    const { tags } = req.body;
    const allProjects = await projectModel.find({status : "notAssigned"});
    const tagsArray = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = await tagModel.findOne({ name: tags[i] });
      tagsArray.push(tag._id);
    }
    const projects = [];
    for (let i = 0; i < allProjects.length; i++) {
      for (let j = 0; j < tagsArray.length; j++) {
        if (allProjects[i].tags.includes(tagsArray[j])) {
          projects.push(allProjects[i]);
          break;
        }        
      }
    }
    res.status(200).send({
      statusCode: 200,
      data: projects,
      message: "projects get by tags successfully",
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
  createProjectController,
  updateProjectController,
  getProjectController,
  deleteProjectController,
  getAllProjectController,
  getProjectsByTagsController
});
