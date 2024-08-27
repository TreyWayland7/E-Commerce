const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });

    res.json(categories);

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find categories'})
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const id = req.params.id;

    const categories = await Category.findAll({
      where: {id},
      include: [
        {
          model: Product
        }
      ]
    });

    res.json(categories);

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find categories'})
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const {category_name} = req.body;

    const categories = await Category.create({category_name});

    res.status(201).json(categories);

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find categories'})
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const id = req.params.id;
    const {category_name} = req.body;

    const didItwork = await Category.update(
      { category_name }, 
      { where: { id } }
    );

    if (didItwork === 0){
      return res.status(404).json({error: "category not found"});
    }
    res.status(200).json({ message: 'Category updated successfully' });


  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find categories'})
  }


});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const id = req.params.id;

    const didItwork = await Category.destroy(
      { where: { id } }
    );

    if (didItwork === 0){
      return res.status(404).json({error: "category not found"});
    }
    res.status(200).json({ message: 'Category deleted successfully' });


  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find categories'})
  }
});

module.exports = router;
