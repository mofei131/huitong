<template>
	<view>
		<view :class="disabled ? 'autheDis' : ''" class="authe">
			<view>
			<text>姓名:</text>
			<input type="text" :disabled="disabled" v-model="name" placeholder="请输入姓名" />
			</view>
			<view>
			<text>手机号:</text>
			<input maxlength="11" :disabled="disabled" type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view>
			<text>公司名称:</text>
			<input type="text" :disabled="disabled" v-model="company"  placeholder="请输入公司名称" />
			</view>
			<view>
			<text>职务:</text>
			<input type="text" :disabled="disabled" v-model="post"  placeholder="请输入职务" />
			</view>
			<view>
			<text>公司地址:</text>
			<input type="text" :disabled="disabled" v-model="address"  placeholder="请输入公司地址" />
			</view>
		</view>
		<view class="keep">
			<button @click="searchClick" v-if="!disabled">保存</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				company:'',
				post:'',
				address:'',
				disabled: false,
			}
		},
		onLoad() {
			let userInfo = wx.getStorageSync('userInfo')
			this.name = userInfo.renzheng_name ? userInfo.renzheng_name : ''
			this.phone = userInfo.renzheng_mobile ? userInfo.renzheng_mobile : ''
			this.company = userInfo.renzheng_company ? userInfo.renzheng_company : ''
			this.post = userInfo.renzheng_position ? userInfo.renzheng_position : ''
			this.address = userInfo.renzheng_address ? userInfo.renzheng_address : ''
			if (userInfo.renzheng_name) this.disabled = true
		},
		onNavigationBarButtonTap(e) {
			this.disabled = false
		},
		methods:{
			searchClick() {
				if (!this.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: 'none',
					})
					return
				}
				if (this.phone.length != 11) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none',
					})
					return
				}
				if (!this.company) {
					uni.showToast({
						title: '请输入公司名称',
						icon: 'none',
					})
					return
				}
				if (!this.post) {
					uni.showToast({
						title: '请输入您的职务',
						icon: 'none',
					})
					return
				}
				if (!this.address) {
					uni.showToast({
						title: '请输入公司地址',
						icon: 'none',
					})
					return
				}
				let that = this
				this.http.ajax({
					url: 'user/authCompany',
					method: 'GET',
					data: {
						user_id: wx.getStorageSync('userInfo').id,
						renzheng_name: this.name,
						renzheng_mobile: this.phone,
						renzheng_company: this.company,
						renzheng_position: this.post,
						renzheng_address: this.address
					},
					success: function(res) {
						if (res.code == 200) {
							uni.showToast({
								title: '认证成功！'
							})
							uni.setStorageSync('userInfo', res.data)
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
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
	body{
		background: #fff!important;
	}
	.authe{
		width: 720rpx;
		height: 484rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		font-size: 28rpx;
		padding-left: 20rpx;
	}
	
	.autheDis {
		
	}
	.authe view{
		display: flex;
		margin: 50rpx 0 50rpx 0;
		box-sizing: border-box;
	}
	.authe view text{
		width: 170rpx;
		text-align: start;
	}
	.authe view input{
		width: 550rpx;
	}
	.autheDis view input{
		color: #999;
	}
	.keep button{
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		bottom: 72rpx;
	}
</style>
