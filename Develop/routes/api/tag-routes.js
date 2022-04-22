const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Retrieves all Tags JSON
router.get('/', (req, res) => {
  
  Tag.findAll({
    attributes: [
    'id',
    'tag_name'
    ],
    include: [
      {
    model: Product,
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ]
  }
]
  })
  .then(
    dbTagData => res.json(dbTagData)
  ).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});
// Retrieves one tag by ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [{
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }
  ]
  })
  .then(
    dbTagData => res.json(dbTagData)
  ).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});
// Allows to create a tag using JSON
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(
    dbTagData => res.json(dbTagData)
  ).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});
// Updates a tag by ID
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where:{
      id: req.params.id
    }
  })
  .then(
    dbTagData => res.json(dbTagData)
  ).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});
// Deletes a tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(
    dbTagData => res.json(dbTagData)
  ).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
