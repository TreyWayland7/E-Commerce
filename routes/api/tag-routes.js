const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: [
        {model: Product}
      ]

    })

    res.json(tags);

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find tags'})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try{
    const tags = await Tag.findAll({
      where: { id: req.params.id },
      include: [
        {model: Product}
      ]

    })

    res.json(tags);

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find tags'})
  }

});

router.post('/', async (req, res) => {
  // create a new tag

 try{
  const {tag_name} = req.body;
  const tag = await Tag.create({tag_name});
  res.status(201).json(tag);
  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to find tags'})
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const {tag_name} = req.body;

    const id = req.params.id;

    const didItwork = await Tag.update(
      {tag_name},
      {where: {id}, returning: true },

    );

    if (didItwork === 0){
      res.status(404).json({error: 'Failed to find tags'})
    }
    const updatedTag = await Tag.findByPk(id);
    res.json(updatedTag);

    }catch(err){
      console.error(err);
      res.status(500).json({error: 'Failed to find tags'})
    }

});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const id = req.params.id;

    const didItwork = await Tag.destroy({
      where: {id},
    });

    if (didItwork === 0){
      res.status(404).json({error: 'Failed to find tags'})
    }
    res.status(404).json({message: 'Delete success.'});

    }catch(err){
      console.error(err);
      res.status(500).json({error: 'Failed to find tags'})
    }


});

module.exports = router;
