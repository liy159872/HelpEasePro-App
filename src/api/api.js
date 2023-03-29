import request from '@/utils/request'

const IndexUrl= '/home/index'; //首页数据接口
export function getHome() {
  return request({
    url: IndexUrl,
    method: 'get'
  })
}

const CatalogList='/catalog/index'; //分类目录全部分类数据接口
export function catalogList() {
  return request({
    url: CatalogList,
    method: 'get'
  })
}

const CatalogCurrent='/catalog/current'; //分类目录当前分类数据接口
export function catalogCurrent(query) {
  return request({
    url: CatalogCurrent,
    method: 'get',
    params: query
  })
}

const AuthLoginByWeixin='/auth/login_by_weixin'; //微信登录


const AuthLoginByAccount='/auth/login'; //账号登录
export function authLoginByAccount(data) {
  return request({
    url: AuthLoginByAccount,
    method: 'post',
    data
  })
}
const AuthLogout='/auth/logout'; //账号登出
export function authLogout() {
  return request({
    url: AuthLogout,
    method: 'post'
  })
}
const AuthInfo='/auth/info'; //用户信息
export function authInfo() {
  return request({
    url: AuthInfo,
    method: 'get'
  })
}
const AuthProfile='/auth/profile'; //账号修改
export function authProfile(data) {
  return request({
    url: AuthProfile,
    method: 'post',
    data
  })
}
const AuthRegister='/auth/register'; //账号注册
export function authRegister(data) {
  return request({
    url: AuthRegister,
    method: 'post',
    data
  });
}
const AuthReset='/auth/reset'; //账号密码重置
export function authReset(data) {
  return request({
    url: AuthReset,
    method: 'post',
    data
  })
}
const AuthRegisterCaptcha='/auth/regCaptcha'; //注册验证码
export function authRegisterCaptcha(data) {
  return request({
    url: AuthRegisterCaptcha,
    method: 'post',
    data
  })
}
const AuthCaptcha='/auth/captcha'; //验证码
export function authCaptcha(data) {
  return request({
    url: AuthCaptcha,
    method: 'post',
    data
  })
}

const GoodsCount='/goods/count'; //统计求助总数
export function goodsCount() {
  return request({
    url: GoodsCount,
    method: 'get'
  })
}
export const GoodsList='/goods/list'; //获得求助列表
export function goodsList(query) {
  return request({
    url: GoodsList,
    method: 'get',
    params: query
  })
}
const GoodsCategory='/goods/category'; //获得分类数据
export function goodsCategory(query) {
  return request({
    url: GoodsCategory,
    method: 'get',
    params: query
  })
}
const GoodsDetail='/goods/detail'; //获得求助的详情
export function goodsDetail(query) {
  return request({
    url: GoodsDetail,
    method: 'get',
    params: query
  })
}
const GoodsRelated='/goods/related'; //求助详情页的关联求助（大家都在看）

const BrandList='/brand/list'; //互援列表
export function brandList(query) {
  return request({
    url: BrandList,
    method: 'get',
    params: query
  })
}
const BrandDetail='/brand/detail'; //互援详情
export function brandDetail(query) {
  return request({
    url: BrandDetail,
    method: 'get',
    params: query
  })
}

const CartList='/cart/index'; //获取Help的数据
export function cartList(query) {
  return request({
    url: CartList,
    method: 'get',
    params: query
  })
}
const CartAdd='/cart/add'; // 添加求助到Help
export function cartAdd(data) {
  return request({
    url: CartAdd,
    method: 'post',
    data
  })
}
const CartFastAdd='/cart/fastadd'; // 立即揭榜求助
export function cartFastAdd(data) {
  return request({
    url: CartFastAdd,
    method: 'post',
    data
  })
}
const CartUpdate='/cart/update'; // 更新Help的求助
export function cartUpdate(data) {
  return request({
    url: CartUpdate,
    method: 'post',
    data
  })
}
const CartDelete='/cart/delete'; // 删除Help的求助
export function cartDelete(data) {
  return request({
    url: CartDelete,
    method: 'post',
    data
  })
}
const CartChecked='/cart/checked'; // 选择或取消选择求助
export function cartChecked(data) {
  return request({
    url: CartChecked,
    method: 'post',
    data
  })
}
const CartGoodsCount='/cart/goodscount'; // 获取Help求助件数
export function cartGoodsCount() {
  return request({
    url: CartGoodsCount,
    method: 'get'
  })
}
const CartCheckout='/cart/checkout'; // 下单前信息确认
export function cartCheckout(query) {
  return request({
    url: CartCheckout,
    method: 'get',
    params: query
  })
}

const CollectList='/collect/list'; //收藏列表
export function collectList(query) {
  return request({
    url: CollectList,
    method: 'get',
    params: query
  })
}
const CollectAddOrDelete='/collect/addordelete'; //添加或取消收藏
export function collectAddOrDelete(data) {
  return request({
    url: CollectAddOrDelete,
    method: 'post',
    data
  })
}
const CommentList='/comment/list'; //评论列表
const CommentCount='/comment/count'; //评论总数
const CommentPost='/comment/post'; //发表评论

const TopicList='/topic/list'; //专题列表
export function topicList(query) {
  return request({
    url: TopicList,
    method: 'get',
    params: query
  })
}
const TopicDetail='/topic/detail'; //专题详情
export function topicDetail(query) {
  return request({
    url: TopicDetail,
    method: 'get',
    params: query
  })
}
const TopicRelated='/topic/related'; //相关专题
export function topicRelated(query) {
  return request({
    url: TopicRelated,
    method: 'get',
    params: query
  })
}

const SearchIndex='/search/index'; //搜索关键字
const SearchResult='/search/result'; //搜索结果
const SearchHelper='/search/helper'; //搜索帮助
const SearchClearHistory='/search/clearhistory'; //搜索历史清楚

const AddressList='/address/list'; //求援地址列表
export function addressList(query) {
  return request({
    url: AddressList,
    method: 'get',
    params: query
  })
}

const AddressDetail='/address/detail'; //求援地址详情
export function addressDetail(query) {
  return request({
    url: AddressDetail,
    method: 'get',
    params: query
  })
}
const AddressSave='/address/save'; //保存求援地址
export function addressSave(data) {
  return request({
    url: AddressSave,
    method: 'post',
    data
  })
}
const AddressDelete='/address/delete'; //保存求援地址
export function addressDelete(data) {
  return request({
    url: AddressDelete,
    method: 'post',
    data
  })
}

const ExpressQuery='/express/query'; //物流查询

const OrderSubmit='/order/submit'; // 提交揭榜单
export function orderSubmit(data) {
  return request({
    url: OrderSubmit,
    method: 'post',
    data
  })
}
const OrderPrepay='/order/prepay'; // 揭榜单的预援助会话
export function orderPrepay(data) {
  return request({
    url: OrderPrepay,
    method: 'post',
    data
  })
}
const OrderH5pay = '/order/h5pay'; // h5援助
export function orderH5pay(data) {
  return request({
    url: OrderH5pay,
    method: 'post',
    data
  });
}
export const OrderList='/order/list'; //揭榜单列表
export function orderList(query) {
  return request({
    url: OrderList,
    method: 'get',
    params: query
  })
}
const OrderDetail='/order/detail'; //揭榜单详情
export function orderDetail(query) {
  return request({
    url: OrderDetail,
    method: 'get',
    params: query
  })
}
const OrderCancel='/order/cancel'; //取消揭榜单
export function orderCancel(data) {
  return request({
    url: OrderCancel,
    method: 'post',
    data
  })
}
const OrderRefund='/order/refund'; //退款取消揭榜单
export function orderRefund(data) {
  return request({
    url: OrderRefund,
    method: 'post',
    data
  })
}
const OrderDelete='/order/delete'; //删除揭榜单
export function orderDelete(data) {
  return request({
    url: OrderDelete,
    method: 'post',
    data
  })
}
const OrderConfirm='/order/confirm'; //确认求援
export function orderConfirm(data) {
  return request({
    url: OrderConfirm,
    method: 'post',
    data
  })
}
const OrderGoods='/order/goods'; // 代评价求助信息
const OrderComment='/order/comment'; // 评价揭榜单求助信息

const FeedbackAdd='/feedback/submit'; //添加反馈
export function feedbackAdd(data) {
  return request({
    url: FeedbackAdd,
    method: 'post',
    data
  })
}

const FootprintList='/footprint/list'; //足迹列表
const FootprintDelete='/footprint/delete'; //删除足迹

const GrouponList='/groupon/list'; //团互援列表
export function grouponList(query) {
  return request({
    url: GrouponList,
    method: 'get',
    params: query
  })
}
const GroupOn='/groupon/query'; //团互援API-查询
const GroupOnMy='/groupon/my'; //团互援API-我的团互援
const GroupOnDetail='/groupon/detail'; //团互援API-详情
const GroupOnJoin='/groupon/join'; //团互援API-详情

const CouponList='/coupon/list'; //互助外快列表
export function couponList(query) {
  return request({
    url: CouponList,
    method: 'get',
    params: query
  })
}
export const CouponMyList='/coupon/mylist'; //我的互助外快列表
export function couponMyList(query) {
  return request({
    url: CouponMyList,
    method: 'get',
    params: query
  })
}
const CouponSelectList='/coupon/selectlist'; //当前揭榜单可用互助外快列表
export function couponSelectList(query) {
  return request({
    url: CouponSelectList,
    method: 'get',
    params: query
  })
}
const CouponReceive='/coupon/receive'; //互助外快领取
export function couponReceive(data) {
  return request({
    url: CouponReceive,
    method: 'post',
    data
  })
}
const CouponExchange='/coupon/exchange'; //互助外快兑换

const StorageUpload='/storage/upload'; //图片上传,

const UserIndex='/user/index'; //个人页面用户相关信息
export function userIndex() {
  return request({
    url: UserIndex,
    method: 'get'
  })
}
const IssueList='/issue/list'; //帮助信息
export function issueList() {
  return request({
    url: IssueList,
    method: 'get'
  })
}

export function getList(api, query) {
  return request({
    url: api,
    method: 'get',
    params: query
  })
}

export const REFUND_LIST = '';
