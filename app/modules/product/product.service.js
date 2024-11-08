const { Op } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Product = db.product;

const insertIntoDB = async (data) => {
  const result = await Product.create(data);
  return result
};


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { startDate, endDate, productId } = filters;

  console.log(filters);

  const whereConditions = {};

  if (startDate && endDate) {
    whereConditions.created_date = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  } 

  if (productId) {
    whereConditions.Id = productId;  // Use Id instead of id
}

  const result = await Product.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
          ? [[options.sortBy, options.sortOrder]]
          : [['createdAt', 'DESC']],
  });


  

  const total = await Product.count({
      where: whereConditions,
  });

  return {
      meta: {
          total,
          page,
          limit
      },
      data: result
  };
};



const getDataById = async (id) => {
  
  const result = await Product.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {
  const result = await Product.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Product.update(payload,{
    where:{
      Id:id
    }
  })

  return result

};


const ProductService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
};

module.exports = ProductService;