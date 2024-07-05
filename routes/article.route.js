const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.post("/", async (req, res) => {
  const art1 = new Article(req.body);
  try {
    await art1.save();
    res.status(200).json(art1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const art = await Article.find({}, null, {
      sort: { _id: -1 },
    }).populate("scategorieID");
    res.status(200).json(art);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  const art = Article.find();
});

router.put("/:id", async (req, res) => {
  try {
    const art = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// find by Id
router.get("/:id", async (req, res) => {
  try {
    const art = await Article.findById(req.params.id).populate("scategorieID");
    res.status(200).json(art);
  } catch {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer une catégorie

router.delete("/:articleID", async (req, res) => {
  const id = req.params.articleId;
  try {
    await Article.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully" });
  } catch {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
