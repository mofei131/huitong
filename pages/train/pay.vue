<template>
	<view>
		<view class="itemlist">
			<view class="listitem">
				<view>{{arr.name}}</view>
				<view>￥{{arr.price}}</view>
			</view>
			<view class="paylist">
			<view class="wxpay">
				<image src="@/static/images/wxpay.png"></image>
				<view>微信支付</view>
			</view>	
			<image @tap="agreementSuccess" class="fix" :src="agreement==true?'../../static/images/ty1.png':'../../static/images/ty0.png'"></image>
			</view>
			<view class="nowpay">
				<button @tap="pay()">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				arr:{
					id:'',
					name:'',
					price:'',
					},
				agreement: true,
			}
		},
		onLoad(options){
			this.arr.id = options.id
			this.arr.name = options.name
			this.arr.price = options.price
		},
		computed:{
			
		},
		methods:{
			agreementSuccess() {
			  this.agreement = !this.agreement;
			},
			pay(){
				if(this.agreement == false){
					uni.showToast({
						title:"请勾选支付方式",
						icon:'none'
					})
				}else{
					console.log("支付")
					let that  = this
					this.http.ajax({
						url: 'video/buyClass',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							class_id:this.arr.id
						},
						success: function(res) {
							console.log(res.data)
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: {
									appid: res.data.appid,
									partnerid: res.data.partnerid,
									prepayid: res.data.prepayid,
									package: res.data.package,
									timestamp: res.data.timestamp,
									noncestr: res.data.noncestr,
									sign: res.data.sign
								},
								success: function(res) {
									uni.showToast({
										title: '支付成功',
										icon: 'none',
										duration: 1000
									});
									setTimeout(function() {
										uni.navigateBack({
										    delta: 1
										});
									}, 1000);
								},
								fail: function(res) {
									wx.showToast({
										title: res.message,
										icon: 'none'
									});
								}
							});
						}
					});
				}
			}
		}
	}
</script>

<style>
	.itemlist{
		width: 710rpx;
		margin: auto;
	}
	.listitem{
		display: flex;
		height: 147rpx;
		justify-content: space-between;
		padding-top: 54rpx;
		box-sizing: border-box;
	}
	/* .listitem view:nth-child(1){
		margin: auto;
	} */
	.listitem view:nth-child(2){
		color: #FF4D4F;
		font-size: 36rpx;
	}
	.wxpay{
		display: flex;
	}
	.wxpay image{
		width: 84rpx;
		height: 84rpx;
	}
	.wxpay view{
		margin: 24rpx 0 0 13rpx;
	}
	.fix{
		width: 40rpx;
		height: 40rpx;
		/* padding-top: 24rpx; */
		margin-top: 24rpx;
		box-sizing: border-box;
	}
	.paylist{
		display: flex;
		justify-content: space-between;
	}
	.nowpay button{
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 24rpx;
		text-align: center;
		display: block;
		line-height: 70rpx;
		color: #fff;
		margin-top: 154rpx;
	}
</style>
