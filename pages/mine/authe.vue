<template>
	<view>
		<view :class="disabled ? 'autheDis' : ''" class="authe">
			<view>
			<text>姓名:</text>
			<input type="text" :disabled="disabled" v-model="name" placeholder="请输入姓名" />
			</view>
			<text class="border"></text>
			<view>
			<text>手机号:</text>
			<input maxlength="11" :disabled="disabled" type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<text class="border"></text>
			<view>
			<text>公司名称:</text>
			<input type="text" :disabled="disabled" v-model="company"  placeholder="请输入公司名称" />
			</view>
			<text class="border"></text>
			<!-- <view>
			<text>职务:</text>
			<input type="text" :disabled="disabled" v-model="post"  placeholder="请输入职务" />
			</view> -->
			<view>
			<text>职务:</text>
			<picker class="gather" :disabled="disabled" @change="anjianChange2" :value="index2" :range="array2" range-key="record">
				<view class="flex-row">
					<text v-if="isll">{{position}}</text>
					<text v-else>{{array2[index2].record}}</text>
					<image src="../../static/images/rzai.png"></image>
				</view>
			</picker>
			</view>
			<text class="border"></text>
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
				array2: [{
					record: '管理员',id:0
				}, {
					record: '负责人',id:1
				}],
				index2: 0,
				isll:true,
				position:'',
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
		onShow() {
			this.position = uni.getStorageSync('userInfo').renzheng_position
		},
		onNavigationBarButtonTap(e) {
			this.disabled = false
		},
		methods:{
			anjianChange2(e) {
				this.index2 = e.detail.value;
				this.isll = false
			},
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
						renzheng_position: this.index2 == 0?'管理员':'负责人',
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
	.flex-row image{
		width: 66rpx;
		height: 66rpx;
	}
	.gather text{
		width: 500rpx!important;
		/* margin-top: 0rpx!important; */
	}
	.flex-row{
		padding-top: 0rpx!important;
		color: grey;
		padding-left: 15rpx;
		box-sizing: border-box;
	}
	.gather{
		width: 550rpx;
	}
	body{
		background: #fff!important;
	}
	.authe{
		width: 720rpx;
		/* height: 484rpx; */
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		font-size: 28rpx;
		padding-left: 20rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
	}
	.authe view{
		display: flex;
		box-sizing: border-box;
		height: 104rpx;
		padding-top: 30rpx;
	}
	.authe view text{
		width: 170rpx;
		text-align: start;
	}
	.authe view input{
		width: 550rpx;
		font-size: 28rpx;
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