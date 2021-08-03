<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="输入登录手机号码"
					placeholder-style="color:#C1C2C3;" />
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="password" type="text" maxlength="32"
					placeholder="输入登录密码" placeholder-style="color:#C1C2C3;" password="true" />
			</view>

		</view>
		<view class="agreement">
			<text>登录即代表同意</text>
			<navigator url="agreement" open-type="navigate">用户协议</navigator>
			<text>和</text>
			<navigator url="privacyPolicy" open-type="navigate">隐私政策</navigator>
		</view>
		<view class="button-login" ref="login" @tap="bindLogin()">
			<text>确认登录</text>
		</view>

		<view class="agreenment">
			<navigator url="reg" open-type="navigate">注册账户</navigator>
			<navigator url="forget" open-type="navigate">忘记密码?</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			// blur(){
			// 	if(this.phone !== "" && this.password !== ""){
			// 		this.$refs.login.style.opacity = '1'
			// 	}
			// },
			bindLogin() {
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
				this.http.ajax({
					url: 'user/login',
					method: 'GET',
					data: {
						mobile: this.phone,
						password: this.password,
					},
					success: function(res) {
						if (res.code == 200) {
							uni.setStorageSync('userInfo', res.data)
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
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

	.list-call:nth-child(2) {
		margin-top: 20rpx;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 26rpx;
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

	.active {
		opacity: 1;
	}

	.agreenment {
		width: 680rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		padding-top: 18rpx;
		color: #666;
		text-align: center;
		margin: auto;
	}

	.agreement {
		display: flex;
		margin-left: 35rpx;
		color: #666666;
		font-size: 22rpx;
		line-height: 30rpx;
		margin-top: 18rpx;
		box-sizing: border-box;
	}

	.agreement navigator {
		opacity: .8;
		border-bottom: 1rpx solid #666;
	}
</style>
