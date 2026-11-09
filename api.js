let expoUri=process.env.EXPO_PUBLIC_EXPO_URI
// pendingSign otpSign login forgetPassword passwordupdate
export const pendingSign=`${expoUri}/pendingSign`
export const otpSign=`${expoUri}/otpSign`
export const loginUrl=`${expoUri}/login`
export const forgetPassword=`${expoUri}/forgetPassword`
export const passwordupdate=`${expoUri}/passwordupdate`
export const dashboard=`${expoUri}/dashboard`
export const categories=`${expoUri}/categories`
export const categoriesId=`${expoUri}/categories/:id`
export const transaction=`${expoUri}/transaction`
export const transactionId=`${expoUri}/transaction/:id`
export const overAllSummery=`${expoUri}/overAllSummery`
export const categorySummery=`${expoUri}/categorySummery`
export const monthlySummery=`${expoUri}/monthlySummery`





// http://localhost:2000/api/categories       -> POST
// http://localhost:2000/api/categories       -> GET  pass query not important`
// http://localhost:2000/api/categories/:id   -> GET
// http://localhost:2000/api/categories/:id   -> PATCH
// http://localhost:2000/api/categories/:id   -> DELETE

/*
/api/transaction      ->post
/api/transaction      -get
/api/transaction:id   -get
/api/transaction:id   -patch
/api/transaction:id   -delete
*/ 

/*
/api/overAllSummery"
/api/categorySummery
/api/monthlySummery     ->get pass query
*/ 