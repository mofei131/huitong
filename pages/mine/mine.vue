<template>
	<view>
		<view class="topMian">
			<view class="tmLeft">
				<image :src="user.image ? user.image : '/static/images/moren.png'" @click="uploadImage"></image>
				<image src="@/static/images/rzsucess.png" v-if="user.authe == 1"></image>
			</view>
			<view class="tmRight">
				<view>{{user.renzheng_name ? user.renzheng_name : '游客' + user.id}}</view>
				<view>{{user.renzheng_company}}</view>
			</view>
		</view>
		<!-- <view class="list">
			<uni-list>
			    <uni-list-item thumb="../../static/images/meico1.png" title="我的预约" link to="./order"></uni-list-item>
			    <view v-if="user.renzheng_company">
			     <uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="已认证" link
			      to="./authe"></uni-list-item>
			    </view>
			    <view v-if="!user.renzheng_company">
			     <uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="未认证" link
			      to="./authe"></uni-list-item>
			    </view>
			    <uni-list-item thumb="../../static/images/meico3.png" title="联系客服" :rightText=this.phone link
			     @click="cell()"></uni-list-item>
			    <uni-list-item thumb="../../static/images/meico4.png" title="服务协议" link to="./contract"></uni-list-item>
			    <uni-list-item thumb="../../static/images/meico4.png" title="用户协议" link to="../login/agreement"></uni-list-item>
			    <uni-list-item thumb="../../static/images/meico4.png" title="隐私协议" link to="../login/privacyPolicy"></uni-list-item>
			    <uni-list-item thumb="../../static/images/meico5.png" title="关于我们" link to="./about"></uni-list-item>
			    <uni-list-item thumb="../../static/images/meico6.png" title="设置" link to="./setUp"></uni-list-item>
			   </uni-list>
				 
		</view> -->
		<view class="list" v-for="(item,index) in list" :key='index' @click="topage(index)">
			<view class="left">
				<image :src="item.url"></image>
				<view>{{item.title}}</view>
			</view>
			<view class="right">
				<view v-if="index == 1 && user.renzheng_company">已认证</view>
				<view v-if="index == 1 && !user.renzheng_company">未认证</view>
				<view v-if="index == 2">{{phone}}</view>
				<image src="../../static/images/rzai.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				kfphone: 0,
				phone: '',
				list:[{
					url:'../../static/images/meico1.png',
					title:'我的预约',
				},{
					url:'../../static/images/meico2.png',
					title:'认证信息',
				},{
					url:'../../static/images/meico3.png',
					title:'联系客服',
				},{
					url:'../../static/images/meico4.png',
					title:'服务协议',
				},{
					url:'../../static/images/meico4.png',
					title:'用户协议',
				},{
					url:'../../static/images/meico4.png',
					title:'隐私协议',
				},{
					url:'../../static/images/meico5.png',
					title:'关于我们',
				},{
					url:'../../static/images/meico6.png',
					title:'设置',
				}]
			}
		},
		onShow() {
			this.user = uni.getStorageSync('userInfo')
			// console.log(this.user)
		},
		onLoad() {
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
			topage(e){
				if(e == 0){
					uni.navigateTo({
						url:'./order'
					})
				}else if(e == 1){
					uni.navigateTo({
						url:'./authe'
					})
				}else if(e == 2){
					uni.makePhoneCall({
						phoneNumber: this.phone
					});
				}else if(e == 3){
					uni.navigateTo({
						url:'./contract'
					})
				}else if(e == 4){
					uni.navigateTo({
						url:'../login/agreement'
					})
				}else if(e == 5){
					uni.navigateTo({
						url:'../login/privacyPolicy'
					})
				}else if(e == 6){
					uni.navigateTo({
						url:'./about'
					})
				}else if(e == 7){
					uni.navigateTo({
						url:'./setUp'
					})
				}
			},
			// cell() {
			// 	uni.makePhoneCall({
			// 		phoneNumber: this.phone
			// 	});
			// },
			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						let that = this
						uni.uploadFile({
							url: 'http://huitong.boyaokj.cn/api/file/upload', //post请求的地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								let obj = JSON.parse(uploadFileRes.data);
								this.http.ajax({
									url:'user/updateImage',
									method: 'GET',
									data: {
										image:obj.data.url,
										user_id:this.user.id,
									},
									success: function(res) {
										let user = uni.getStorageSync('userInfo')
										user.image = obj.data.url
										uni.setStorageSync('userInfo',user)
										console.log(obj.data.url)
										that.user = user
									}
								})
							}
						})
					},
				})
			},
		}
	}
</script>

<style>
	.right view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.right image{
		width: 66rpx;
		height: 66rpx;
	}
	.left,.right{
		display: flex;
		align-items: center;
	}
	.left view{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 9rpx;
	}
	.left image{
		width: 40rpx;
		height: 40rpx;
	}
	.list{
		width: 720rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding-left: 22rpx;
		box-sizing: border-box;
	}
	body {
		background: #F4F7F7 !important;
	}

	.topMian {
		width: 750rpx;
		height: 409rpx;
		background: #1890FF;
		border-radius: 0px 0px 30px 30px;
		display: flex;
		padding-top: 170rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
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

	/* .list {
		padding-top: 20rpx;
	} */

	/* .unilist view{
		line-height: 40rpx;
		border: 0;
		margin-bottom: 20rpx;
	} */

	/* .view--border-top,
	.view--border-bottom {
		border: 0 !important;
		height: 0 !important;
	} */
</style>
