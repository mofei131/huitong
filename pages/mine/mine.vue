<template>
	<view>
		<view class="topMian" @click="login()">
			<view class="tmLeft">
				<image :src="headPort"></image>
				<image src="@/static/images/rzsucess.png" v-if="user.authe == 1"></image>
			</view>
			<view class="tmRight">
				<view>{{user.renzheng_name ? user.renzheng_name : '游客' + user.id}}</view>
				<view>{{user.renzheng_company}}</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
			    <uni-list-item thumb="../../static/images/meico1.png" title="我的预约" link to="./order"   ></uni-list-item>
				<view v-if="user.renzheng_company">
			    <uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="已认证"  link to="./authe"   ></uni-list-item>
				</view>
				<view v-if="!user.renzheng_company">
				 <uni-list-item thumb="../../static/images/meico2.png" title="认证信息" rightText="未认证"   link to="./authe"   ></uni-list-item>
				 </view>
				<uni-list-item thumb="../../static/images/meico3.png" title="联系客服" rightText="400-820-2550" link @click="cell()"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico4.png" title="服务协议" link to="./contract"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico5.png" title="关于我们" link to="./about"   ></uni-list-item>
				<uni-list-item thumb="../../static/images/meico6.png" title="设置" link to="./setUp"   ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			headPort:"https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/f11f3a292df5e0fef6409b715e6034a85edf7261.jpg",
			user:{}
		}
	},
	onShow() {
		this.user = wx.getStorageSync('userInfo')
	},
	methods:{
		cell(){
			uni.makePhoneCall({
			    phoneNumber: '400-820-2550', 
			  });
		},
		login(){
			uni.navigateTo({
			                url: '/pages/login/login',
			            });
		}
	}
}
</script>

<style>
	.topMian{
		width: 750rpx;
		height: 409rpx;
		background: #1890FF;
		border-radius: 0px 0px 30px 30px;
		display: flex;
		padding-top: 170rpx;
		box-sizing: border-box;
	}
	.tmLeft{
		position: relative;
		margin: 0 50rpx 0 63rpx;
	}
	.tmLeft image:nth-child(1){
		width: 140rpx;
		height: 140rpx;
		background: #F4F9FF;
		border-radius: 75rpx;
	}
	.tmLeft image:nth-child(2){
		width: 40rpx;
		height: 40rpx;
		border-radius: 25rpx;
		position: absolute;
		right: 5rpx;
		top: 100rpx;
	}
	.tmRight view:nth-child(1){
		font-size: 42rpx;
		color: #fff;
		padding-top: 20rpx;
	}
	.tmRight view:nth-child(2){
		font-size: 30rpx;
		color: #fff;
	}
	.list{
		padding-top: 20rpx;
	}
	uni-list-item{
		line-height: 40rpx;
	}
</style>
