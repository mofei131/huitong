<template>
	<view>
		<view class="topMian">
			<view class="tmLeft">
				<image :src="user.avater ? user.avater : '/static/images/moren.png'" @click="uploadImage()"></image>
				<image src="@/static/images/yirenzheng.png" v-if="user.renzheng_company"></image>
			</view>
			<view class="tmRight">
				<view>{{user.renzheng_name ? user.renzheng_name : '游客' + user.id}}</view>
				<view>{{user.renzheng_company}}</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item thumb="../../static/images/meico1.png" title="我的预约" link to="./order"></uni-list-item>
				<view v-if="user.renzheng_company">
					<uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="已认证" link
						to="./authe"></uni-list-item>
				</view>
				<view v-if="!user.renzheng_company">
				 <uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="未认证"   link to="./authe"   ></uni-list-item>
				 </view>
				<uni-list-item thumb="../../static/images/meico3.png" title="联系客服" :rightText=this.phone link @click="cell()"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico4.png" title="服务协议" link to="./contract"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico5.png" title="关于我们" link to="./about"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico6.png" title="设置" link to="./setUp"   ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				kfphone:0,
				phone:''
			}
		},
		onShow() {
			this.user = wx.getStorageSync('userInfo')
			console.log(this.user)
		},
		onLoad(){
			let that = this
			this.http.ajax({
				url: 'index/xieyi',
				method: 'GET',
				data: {
					name: 'kefu',
				},
				success: function(res) {
					that.phone = res.data.value
				}
			});
		},
		methods: {
			cell() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			},
			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'http://huitong.boyaokj.cn/api/upload', //post请求的地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								var obj = JSON.parse(uploadFileRes.data);
							}
						})
					},
				})
			},
		}
	}
</script>

<style>
	.topMian {
		width: 750rpx;
		height: 409rpx;
		background: #1890FF;
		border-radius: 0px 0px 30px 30px;
		display: flex;
		padding-top: 170rpx;
		box-sizing: border-box;
	}

	.tmLeft {
		position: relative;
		margin: 0 50rpx 0 63rpx;
	}

	.tmLeft image:nth-child(1) {
		width: 140rpx;
		height: 140rpx;
		background: #F4F9FF;
		border-radius: 75rpx;
	}

	.tmLeft image:nth-child(2) {
		width: 40rpx;
		height: 40rpx;
		border-radius: 25rpx;
		position: absolute;
		right: 5rpx;
		top: 100rpx;
	}

	.tmRight view:nth-child(1) {
		font-size: 42rpx;
		color: #fff;
		padding-top: 20rpx;
	}

	.tmRight view:nth-child(2) {
		font-size: 30rpx;
		color: #fff;
	}

	.list {
		padding-top: 20rpx;
	}

	uni-list-item {
		line-height: 40rpx;
	}
</style>
