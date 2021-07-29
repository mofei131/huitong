<template>
	<view>
		<view class="itemlist">
			<view class="listitem">
				<input type="number" class="phone" v-model="phone" placeholder="请输入手机号" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png"></image>
			</view>
			<view class="listitem">
				<input type="number" class="code" v-model="code" placeholder="请输入验证码" placeholder-style="color: #5D5D61;"/>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="modify">
			<view>保存</view>
		</view>
	</view>
</template>

<script>
	var _this, js;
	export default{	
		onLoad() {
			_this = this;
		
		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data(){
			return{
				second: 0,
				phone: '',
				code:''
			}
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		methods:{
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				this.http.ajax({
					url: 'user/getVerifyCode',
					method: 'GET',
					data: {
						mobile: this.phone,
					},
					success: function(res) {
						js = setInterval(function() {
							_this.second--;
							if (_this.second == 0) {
								_this.clear()
							}
						}, 1000)
					}
				});
			
			
			},
		}
	}
</script>

<style>
	.listitem image{
		width: 66rpx;
		height: 66rpx;
	}
	.yzm {
		width: 178rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		line-height: 70rpx;
		color: #fff;
		text-align: center;
	}
	.itemlist{
		width: 680rpx;
		margin: auto;
		padding-top: 25rpx;
	}
	.phone{
		width: 610rpx;
	}
	.code{
		width: 477rpx;
	}
	.listitem{
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.listitem input{
		height: 76rpx;
		border-radius: 39rpx;
		background: #f4f4f4;
	}
	.modify{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 72rpx;
		margin: 0 auto;
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		bottom: 72rpx;
		text-align: center;
		line-height: 70rpx;
	}
</style>
