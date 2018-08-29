import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/admin/auth/login', data, 'POST');

/**
 * 退出
 */
export const signout = () => fetch('/admin/singout');



/**
 * 首页
 */
//用户注册
export const userCount = date => fetch('/admin/user/count?date='+date);
//一天订单数
export const orderCount = date => fetch('/admin/order/count?date='+date);
//订单总数
export const AllOrderCount = data => fetch('/admin/order/count', data);
//一天订单额
export const moneyCount = date => fetch('/admin/order/money?date='+date);
//订单总额
export const allMoneyCount = () => fetch('/admin/order/allMoney');


/**
 * 获取订单信息
 */
//export const getOrderList = data => fetch('/bos/orders', data);
export const getOrderList = () => fetch('/admin/order/list');
export const getOrderCount = () => fetch('/admin/order/count');



/**
 * 获取user、admin用户信息
 */

export const getAdminInfo = () => fetch('/admin/admin/info');
//export const adminList = () => fetch('/admin/admin/info');
export const adminCount = () => fetch('/admin/admin/info');
export const getUserCount = data => fetch('/admin/user/count', data);
export const getUserInfo = user_id => fetch('/v1/user/' + user_id);
export const getUserCity = () => fetch('/v1/user/city/count');
export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);
export const getUserList = data => fetch('/admin/user/index', data);





/**
 * 获取所有ad (广告)信息
 */
export const getAdList = () => fetch('/admin/ad/list');
export const getAdInfo = adId =>fetch('/admin/ad/info');
export const storeAd = data => fetch('/admin/ad/store', data, 'POST');
export const getAdCount = () => fetch('/admin/ad/count');
export const deleteAd = data => fetch('/admin/ad/delete', data, 'post');

/**
 * 获取goods(产品）信息
 */
//export const getGoodsList = () => fetch('/admin/goods/list');
export const getGoodsList = data => fetch('/admin/goods/index',data, 'get');
export const storeGoods = data => fetch('/admin/goods/store',data,'post');
export const getGoodsCount = () => fetch('/admin/goods/count');
export const deleteGoods = data => fetch('/admin/goods/destory',data,'post');

/**
 * 获取分类信息
 */
export const getCategory = data => fetch('/admin/category/list', data, 'get');
export const getCategoryCount = data => fetch('/admin/category/count', data, 'get');
export const storeCategory = data => fetch('/admin/category/store', data, 'post');
export const deleteCategory = data => fetch('/admin/category/destory', data, 'post');


/**
 * 频道信息
 */
export const getChannelList = data => fetch('/admin/channel/index', data, 'get');
export const deleteChannel =data => fetch('/admin/channel/destory', data, 'post');
export const storeChannel = data => fetch('/admin/channel/store', data, 'post');


/**
 * 管理员列表
 */
//export const adminList = data => fetch('/admin/all', data);

/**
 * 添加商铺
 */

//export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

// export const searchplace = (cityid, value) => fetch('/v1/pois', {
// 	type: 'search',
// 	city_id: cityid,
// 	keyword: value
// });

/**
 * 获取当前店铺食品种类
 */

//export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */
//export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */
//export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */
//export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取食品列表
 */

//export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

//export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

//export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

//export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);


/**
 * 删除食品
 */

// export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');
