var express = require('express');
var router = express.Router();

var Mock = require('mockjs'); //引入mockjs
var Random = Mock.Random; 

// 扩展mock,生成随机手机号
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189','156','130'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})

// ----------------------------------------------------------------登录相关
// 用户是否注册过、邀请码是否正确
router.post('/register/smsLogon', function(req, res, next) {
	// console.log('收到的请求',req.body);
	res.json('SUCCESS');
});
// 校验验证码
router.post('/register/checkMsgCode', function(req, res, next) {
	res.json(true);
});

// ----------------------------------------------------------------微信相关
// 微信config
router.get('/wx/getWxConfig', function(req, res, next) {
	// 入参:code\userAccount
	var response = {
		err : 'SUCCESS',
		wxConfig : {
				'signature': "ffc1151f6bf17bc1cb1ca39c1dfe06738550b4f0",
				'appId': "wx26a5b69be5b4dad3",
				'jsapi_ticket': "sM4AOVdWfPE4DxkXGEs8VLruF4NbcO9S-8Fhgn3hNhMTZ5ddCp26YQbroRqiFTWB4zE6eFpV_Joz_4yynuopbA",
				'url': "http://jilinodin.nat100.top/?code=031fy4100JrvLK18Wz30084YRx2fy41I&state=123",
				'nonceStr': "912d24c357734b999be1833a04d883f0",
				'timestamp': "1606980223"
			}
	}
	res.json(response);
});

// ----------------------------------------------------------------商品相关
// 获取商品列表
router.post('/commodity/getByUserSlight', function(req, res, next) {
	var response = Mock.mock({
		code: 0,
		msg: "数据加载成功！",
		count: 10,
		limit: 10,
		page: 1,
		totalPages: 2,
		'data|10' : [{
			'commId|+1': 1,
			'commCode': "@string(number,19)",
			'commName': "@ctitle",
			'commBasePrice': "@integer(100,300)" ,
			'commPrice': "@integer(0,100)",
			'commIntroduce': "@ctitle",
			'commInfo': "@ctitle",
			'commStock': "@integer(0,999)",
			'commState': 0,
			'commCategory1': null,
			'commCategory2': null,
			'commCategory3': null,
			'commType': null,
			'shopCode': null,
			'districtCode': null,
			'operCode': null,
			'operName': null,
			'cents_1|1': ["1","5","7"],
			'cents_2|1': ["1","5","7"],
			'cents_3|1': ["1","5","7"],
			'url|1': ["@image(250,#fed201)","@image(250,#81e4d0)","@image(250,#e36068)"],
			'operDate': null,
			'state': 1,
			'weight': 0,
			'page': 1,
			'limit': 10,
			'commCost': 0,
			'commVolumeInvented': "@integer(0,100)",
			'commVolumeTrue': 0
		}]
	})
	res.json(response);
});
// 获取商品详情
router.post('/commodity/getDetail', function(req, res, next) {
	var response = Mock.mock({
			'commId|+1': 1,
			'commCode': "@string(number,19)",
			'commName': "@ctitle",
			'commBasePrice': "@integer(100,300)" ,
			'commPrice': "@integer(0,100)",
			'commIntroduce': "@ctitle",
			'commInfo': "@ctitle",
			'commStock': "@integer(0,999)",
			'commState': 0,
			'commCategory1': null,
			'commCategory2': null,
			'commCategory3': null,
			'commType': null,
			'shopCode': null,
			'districtCode': null,
			'operCode': null,
			'operName': null,
			'cents_1|1': ["1","5","7"],
			'cents_2|1': ["1","5","7"],
			'cents_3|1': ["1","5","7"],
			'url|1': ["@image(250,#fed201)","@image(250,#81e4d0)","@image(250,#e36068)"],
			'operDate': null,
			'state': 1,
			'weight': 0,
			'page': 1,
			'limit': 10,
			'commCost': 0,
			'commVolumeInvented': "@integer(0,100)",
			'commVolumeTrue': 0
	})
	res.json(response);
});
// 获取商品图片
router.post('/photo/getPhotos', function(req, res, next) {
	var response = Mock.mock({
			"photos|1-3":["@image(500,#ff9b08)","@image(500,#fed201)","@image(500,#e36068)"]
	})
	var result = response.photos
	res.json(result);
});

// ----------------------------------------------------------------订单相关
// 添加订单
router.post('/order/addOrderDtl', function(req, res, next) {
	var response = Mock.mock({
			"billId": "@string(number,19)", 
			"errmsg": "SUCCESS"
	})
	res.json(response);
});
// 删除订单
router.post('/order/deleteUnpaidOrder', function(req, res, next) {
	var response = Mock.mock({
		'result|1':[{
			'code': 1,
			'message': "删除成功",
			'data': null
		},{
			'code': -1,
			'message': "删除失败"
		}]
	})
	var result = response.result
	res.json(result);
});
// 获取订单列表
router.post('/order/getOrderList', function(req, res, next) {
	console.log('收到的请求',req.body);
	let payState,verState
	if(req.body.payState === 0 && req.body.verState === 0){// 待支付订单
		payState = 0
		verState = 0
	}else if(req.body.payState === 1 && req.body.verState === 0){
		payState = 1
		verState = 0
	}else{
		payState = 0
		verState = 0
	}
	var response = Mock.mock({
		code: 1,
		msg: "SUCCESS",
		count: 10,
		limit: 10,
		page: 1,
		totalPages: 2,
		"data|10" : [{
			orderdtlId: 1120,
			billId: "@string(number,19)",
			billType: null,
			auctiondtlId: 0,
			refundId: null,
			payType: 0,
			payMode: null,
			commCode: "@string(number,19)",
			commName: "@ctitle",
			commPrice: "@integer(0,100)",
			"commStock|1": [1,2,1],
			"totalAmount|0-100.2": 0,
			commBasePrice: "@integer(0,100)",
			userId: 0,
			shopCode: "@string(number,8)",
			shopName: null,
			providerCode: null,
			providerName: null,
			payDate: null,
			addDate: "@datetime",
			verState: verState,
			payState: payState,
			state: 0,
			commCost: 0,
			commId: 0,
			addDateStr: null,
			payDateStr: null,
			openid: null,
			url: "@image(250,#ffeabe)"
		}]
	})
	res.json(response);
});
// 获取订单详情
router.post('/order/getOrderInfo', function(req, res, next) {
	// 入参:code\userAccount
	var response = Mock.mock({
			"commIntroduce": "测试商品",
			"shop":{
				'shopId': 36,
				'shopCode': "ceshi101",
				'shopName': "测试商户勿删",
				'shopIntroduce': null,
				'shopInfo': null,
				'shopPhone': "13845969707",
				'shopCategory1': null,
				'shopCategory2': null,
				'shopCategory3': null,
				'districtCode': null,
				'providerCode': null,
				'operCode': null,
				'operName': null,
				'operDate': null,
				'state': 1,
				'longitude': "126.56538",
				'latitude': "43.851673",
				'address': "吉林省吉林市船营区南京街12号",
				'withdrawMode': null,
				'withdrawPhone': null,
				'withdrawNumber': null,
				'realName': null
			},
			"qrCode":"We4oUgArOC6RA0ZsWpwpWnM1ECCpOKpGYPfvV9EzKZnrMdqOf4SxkzNTrMwpbl4Ye0lRvjWgEMDph6j5aJHieBO/czrWJeLVbHtrNYTGUac=",
			"phone":"132****3038",
			"orderdtl":{
				'orderdtlId': 0,
				'billId': "2020120915132498132",
				'billType': null,
				'auctiondtlId': 0,
				'refundId': null,
				'payType': 0,
				'payMode': null,
				'commCode': "SH20201208132323108",
				'commName': "测试商品",
				'commPrice': 0.01,
				'commStock': 1,
				'totalAmount': 0.01,
				'commBasePrice': 100,
				'userId': 32,
				'shopCode': "ceshi101",
				'shopName': "测试商户勿删",
				'providerCode': null,
				'providerName': null,
				'payDate': null,
				'addDate': null,
				'verState': 0,
				'payState': 0,
				'state': 0,
				'commCost': 0,
				'commId': 0,
				'addDateStr': null,
				'payDateStr': null,
				'openid': null,
				'url': null
			}
	})
	res.json(response);
});

// ----------------------------------------------------------------用户相关
// 用户信息
router.post('/wx/wxUserInfo', function(req, res, next) {
	// 入参:code\userAccount
	var response = {
		code : 1,
		message : 'SUCCESS',
		data : Mock.mock({
				'shopCode': "ceshisahnghu20201123",
				'parentName': "官方",
				'balance': 0,
				'qrCode': "https://shopping.odinjilin.com/#/pages/tabBar/personalCenter/personalCenter?parentId=32&type=register",
				'phone': "132****3038",
				'spreadId': 29,
				'count': 6,
				'userName': "歌",
				'userId': 32,
				'parentId': 1,
				'openid': "oR38-s7Ombfbc3nmnuSYogGVZyR8",
				'headimgurl': "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqxmEBrrR9QSvl1KJIRmsHiaSQHQibrX6X41O5HXoZHSJxA28pIjF5rMcQgKgwf6SvWkianEKjr0zeKA/132"
			})
	}
	res.json(response);
});
// 用户金额
router.post('/user/getMoney', function(req, res, next) {
	var response = {
		code : 1,
		message : 'SUCCESS',
		data : Mock.mock({
					"balance": Random.integer(0,5000),
					"count": Random.integer(0,200),  
					"frozen": Random.integer(0,500)
				})
	}
	res.json(response);
});

// ----------------------------------------------------------------钱包相关
// 钱包金额
router.post('/user/getBalanceSummary', function(req, res, next) {
	var response = {
		code : 1,
		message : 'SUCCESS',
		data : Mock.mock({
					"balance": Random.integer(50,300), 
					"moneyWithdrawaling": Random.integer(-2000,0),
					"moneyWithdrawal1": Random.integer(0,2000),
					"moneyWithdrawal2": Random.integer(0,5000),
					"moneyGrandparent": Random.integer(0,2000),
					"moneyParent": Random.integer(0,1000),
					"moneyOwn": Random.integer(0,500)
				})
	}
	res.json(response);
});
// 用户提现明细
router.post('/user/getBalanceDetail', function(req, res, next) {
	var response = Mock.mock({
			"code": 1,
		    "msg": "数据加载成功！",
		    "count": 10,
		    "limit": 1,
		    "page": 1,
		    "totalPages": 1,
		    "data|5": [ //从下方两个对象中随机抽取,重复10次
		        {	// 支出
		            "balanceType": "提现",
		            "withdrawState": "审核中",
					"withdrawStateCode": "0",
		            "cost|-30-0.2": 1,
		            "opderDate": "@datetime",
		            "billId": "@string(number,19)"
		        },
				{	// 收入
		            "balanceType": "推广用户消费收益",
		            "withdrawState": "",
		            "cost|0-150.2": 1, // 0-150的小数点两位数组
		            "opderDate": "@datetime",// 日期+时间
		            "billId": "@string(number,19)" // 19位订单号
		        },
				{	// 支出
		            "balanceType": "提现",
		            "withdrawState": "已驳回",
					"withdrawStateCode": "2",
		            "cost|-30-0.2": 1,
		            "opderDate": "@datetime",
		            "billId": "@string(number,19)"
		        },
		    ]
		})
	res.json(response);
});
// 提现前获取用户信息
router.post('/user/getWithdrawalUserInfo', function(req, res, next) {
	var response = {
		code : 1,
		message : 'SUCCESS',
		data : Mock.mock({
					"phone": "@phone", // Mock.Random.phone()
					"name": "@cname"
					// "name": ""
				})
	}
	res.json(response);
});
// 用户提现
router.post('/user/addUseWithdraw', function(req, res, next) {
	// 从两中情况中随机选取一种
	var subject = Mock.mock({
					"property|1":[{
						code : 1,
						message : 'SUCCESS',
						data:'kodgnk8906'
					},{
						code : -1,
						'message|1' : ['未找到提现业务员信息','发送提现消息失败']
					}]
				})
	// 将最终情况赋给response
	var response = subject.property
	res.json(response);
});

// ----------------------------------------------------------------商户相关
// 商户中心
router.post('/shop/getShopBalanceInfo', function(req, res, next) {
	// console.log('收到的请求',req.body);
	var response = {
		code : 1,
		message : 'SUCCESS',
		data : Mock.mock({
			'tradeNum|1-30' : 1,
			'cashOuting|-50--150' : 50,
			'cashOutble|0-10' : 10
		})
	}
	res.json(response);
});
// 商户交易详情
router.post('/shop/getShopBalanceDetail', function(req, res, next) {
	// console.log('收到的请求',req.body);
	var response = Mock.mock({
		code : 1,
		message : 'SUCCESS',
		"data|1-5" : [{
			"tradeTit" : '@ctitle',
			"tradeName" : '@cname',
			"tradePhone" : '@phone',
			"tradeTime" : '@datetime',
			"tradeCost" : '@integer(-100,0)',
			"tradeState" :0,
			"tradeStateText" : '提现中'
		},{
			"tradeTit" : '@ctitle',
			"tradeName" : '@cname',
			"tradePhone" : '@phone',
			"tradeTime" : '@datetime',
			"tradeCost" : '@integer(0,100)',
			"tradeState" :1,
			"tradeStateText" : '用户消费'
		}]
	})
	res.json(response);
});

module.exports = router;