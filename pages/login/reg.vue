<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder-style="color:#C1C2C3;"
					placeholder="请输入登录手机号码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="code" type="number" maxlength="4" placeholder-style="color:#C1C2C3;"
					placeholder="短信验证码" />
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder-style="color:#C1C2C3;"
					placeholder="请输入登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'"
					@tap="display"></image>
			</view>

		</view>
		<view class="agreement">
			<text v-if="password == ''">密码为6-20位，可由数字、字母、符号组成。</text>
			<!-- <text v-if="password != ''">登录即代表同意<navigator url="agreement" open-type="navigate" class="xiahuaxian">用户协议</navigator>及<navigator
					class="xiahuaxian" url="privacyPolicy" open-type="navigate">隐私政策</navigator></text> -->
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			<text>立即注册</text>
		</view>
		<view class="agreenment">
			<navigator url="login" open-type="navigate">已有账号使用密码登录</navigator>
		</view>
	</view>
</template>

<script>
	var _this, js;
	export default {
		onLoad() {
			_this = this;

		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phone: '',
				password: '',
				code: '',
				invitation: '',
				agreement: true,
				showPassword: false,
				second: 0
			};
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
		onUnload() {
			this.clear()
		},
		methods: {
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			display() {
				this.showPassword = !this.showPassword
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
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
			bindLogin() {
				// if (this.agreement == false) {
				//   uni.showToast({
				//     icon: 'none',
				//     title: '请先阅读《软件用户协议》'
				//   });
				//   return;
				// }
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				if (this.code.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				this.http.ajax({
					url: 'user/register',
					method: 'GET',
					data: {
						mobile: this.phone,
						password: this.password,
						code: this.code
					},
					success: function(res) {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration:1000
						})
						if (res.code == 200) {
							setTimeout(() => {
								wx.redirectTo({
									url: 'login'
								}, 1000)
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161rpx;
		height: 161rpx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding: 20rpx 35rpx 0;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 76rpx;
		width: 680rpx;
		color: #666;
		background: #F4F4F4;
		border-radius: 39rpx;
		font-size: 26rpx;
		margin-top: 20rpx;
		padding: 0 31rpx;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 26rpx;
	}

	/* .yzm {
    color: #FF7D13;
    font-size: 24rpx;
    line-height: 64rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    width: auto;
    height: 64rpx;
    border: 1rpx solid #FFA800;
    border-radius: 50rpx;
  } */
	.yzm {
		color: #1890FF;
		font-size: 26rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		/* border: 1rpx solid #FFA800; */
		border-radius: 50rpx;
	}

	.yzms {
		color: #1890FF !important;
		/* border: 1rpx solid #999999; */
	}

	.button-login {
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		/* opacity: 0.4; */
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin: auto;
		margin-top: 32rpx;
	}

	.agreement {
		display: flex;
		margin-left: 35rpx;
		font-size: 22rpx;
		line-height: 30rpx;
		margin-top: 18rpx;
		box-sizing: border-box;
	}

	.agreement text{
		color: #666666;
	}

	.agreement image {
		width: 40rpx;
		height: 40rpx;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		justify-content: flex-end;
		font-size: 22rpx;
		padding-top: 18rpx;
		padding-right: 36rpx;
		color: #666;
	}

	.xiahuaxian {
		text-decoration: underline;
		color: #999;
		display: inline-block;
	}
</style>
