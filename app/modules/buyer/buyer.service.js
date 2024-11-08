const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Buyer = db.buyer;

const insertIntoDB = async (data) => {
  const result = await Buyer.create(data);

  return result
};


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { startDate, endDate, buyerId } = filters;

  const whereConditions = {};

  if (startDate && endDate) {
    whereConditions.created_date = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  if (buyerId) {
    whereConditions.Id = buyerId;  // Use Id instead of id
}

  const result = await Buyer.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
          ? [[options.sortBy, options.sortOrder]]
          : [['createdAt', 'DESC']],
  });

  const total = await Buyer.count({
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
  
  const result = await Buyer.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {
  const result = await Buyer.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Buyer.update(payload,{
    where:{
      Id:id
    }
  })

  return result

};


 const BuyerService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById
}


module.exports = BuyerService;