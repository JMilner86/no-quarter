const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint, allows to retrieve JSON for all categories
router.get('/', (req, res) => {
  
    Category.findAll({
      attributes: [
      'id',
      'category_name'
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
      dbCategoryData => res.json(dbCategoryData)
    ).catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
});
// Retrieves JSON for ONE category by ID
router.get('/:id', (req, res) => {
    Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'category_name'
      ],
      includeAs: [{
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock'
        ]
      }]
    })
    .then(
      dbCategoryData => res.json(dbCategoryData)
    ).catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
});
// Allows user to create new categories in JSON format
router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name,
    })
    .then(
      dbCategoryData => res.json(dbCategoryData)
    ).catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
});
// Allows user to change categories by ID using JSON
// router.put('/:id', (req, res) => {
//     Category.update(req.body, {
//       where: 
//       {
//         id: req.body.id,
//         category_name: req.body.category_name
//       },
//       attributes: [
//         'id',
//         'category_name'
//       ]
//     },
//     )
//     .then(
//       dbCategoryData => res.json(dbCategoryData)
//     ).catch(err=> {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.put('/:id', (req, res) => {
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { category_id: req.params.id } });
    })
    .then((updatedCategoryTags) => res.json(updatedCategoryTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
// Deletes a category JSON data
router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(
      dbCategoryData => res.json(dbCategoryData)
    ).catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
