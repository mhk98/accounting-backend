
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Supplier = db.supplier;
const Purchase = db.purchase;

const insertIntoDB = async (data) => {
  const result = await Supplier.create(data);

  return result
};


// const getAllFromDB = async (filters, options) => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { startDate, endDate, supplierId } = filters;

//   // console.log(filters);
//   const whereConditions = {};

//   if (startDate && endDate) {
//     whereConditions.created_date = {
//       [Op.between]: [new Date(startDate), new Date(endDate)]
//     };
//   }


//   if (supplierId) {
//     whereConditions.Id = supplierId;  // Use Id instead of id
// }


//   const result = await Supplier.findAll({
//       where: whereConditions,
//       offset: skip,
//       limit,
//       order: options.sortBy && options.sortOrder
//           ? [[options.sortBy, options.sortOrder]]
//           : [['createdAt', 'DESC']],
//   });

//   const total = await Supplier.count({
//       where: whereConditions,
//   });



//   const supplierDueAmount = await Purchase.findOne({
//     where:{
//       supplierId:result.Id
//     }
//   })

//   let totalSupplierDueAmount = 0;

//   supplierDueAmount.forEach((transaction) => {
//     const amount = Number(transaction.due_amount)

//     totalSupplierDueAmount += amount
//   });


//   console.log('totalSupplierDueAmount', totalSupplierDueAmount)

//   return {
//       meta: {
//           total,
//           page,
//           limit
//       },
//       data: {
//         result, totalSupplierDueAmount
//       }
//   };
// };



const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { startDate, endDate, supplierId } = filters;

  const whereConditions = {};

  if (startDate && endDate) {
    whereConditions.created_date = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  if (supplierId) {
    whereConditions.Id = supplierId;
  }

  const result = await Supplier.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder]]
      : [['createdAt', 'DESC']],
  });

  const total = await Supplier.count({
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
  
  const result = await Supplier.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {
  const result = await Supplier.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Supplier.update(payload,{
    where:{
      Id:id
    }
  })

  return result

};


 const SupplierService = {
getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById

}

module.exports = SupplierService;