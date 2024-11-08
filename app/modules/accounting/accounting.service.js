const { Op } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Accounting = db.accounting;

const getAllFromDB = async ( options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { startDate, endDate } = filters;

  const whereConditions = {};

//   if (startDate && endDate) {
//     whereConditions.created_date = {
//       [Op.between]: [new Date(startDate), new Date(endDate)]
//     };
//   }

const data = await Accounting.findAll();

const accountingBalance = {
    totalPurchaseAmount: 0,
    totalSaleAmount: 0
}

data.forEach(transaction => {
    const amount = Number(transaction.transaction_amount)


    if(transaction.transaction_type === 'Purchase'){
        accountingBalance.totalPurchaseAmount += amount
    } else if(transaction.transaction_type === 'Sale'){
        accountingBalance.totalSaleAmount += amount

    }
});

const totalPurchaseAmount = accountingBalance.totalPurchaseAmount;
const totalSaleAmount = accountingBalance.totalSaleAmount;
const finalAccountingBalance = Number(accountingBalance.totalSaleAmount-accountingBalance.totalPurchaseAmount)

console.log('accountingBalance', accountingBalance);

const result = await Accounting.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder]]
      : [['createdAt', 'DESC']],
  });


  

  const total = await Accounting.count({
    where: whereConditions,
  });

  return {
      meta: {
          total,
          page,
          limit
      },
      data: {
        result, 
        totalPurchaseAmount,
        totalSaleAmount,
        finalAccountingBalance
      }
  };
};



const getDataById = async (id) => {
  
  const result = await Accounting.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {
  const result = await Accounting.destroy(
    {
      where:{
        Id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await Accounting(payload,{
    where:{
      Id:id
    }
  })

  return result

};


const AccountingService = {
  getAllFromDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
};

module.exports = AccountingService;