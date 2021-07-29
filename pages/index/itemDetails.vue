<template>
	<view class="details">
		<view class="banner">
		<image src="@/static/images/detimg.png"></image>
		<view class="topBar">
			<image src="@/static/images/leftback.png" @click="back()"></image>
			<view>检测详情</view>
		</view>
		</view>
		<view class="explain">
			<view class="title">~产品介绍~</view>
			<view class="content">{{details.content}}</view>
		</view>
		<view class="explain">
			<view class="title">~服务说明~</view>
			<view class="list first">
				<view>服务时间:</view>
				<view>{{details.time1}}</view>
			</view>
			<view class="list">
				<view>服务时间:</view>
				<view>{{details.time2}}</view>
			</view>
		</view>
		<view class="explain">
			<view class="title">~服务流程~</view>
			<image src="@/static/images/lcimg.png"></image>
		</view>
		<view class="yuyue">
			<button @click="order()" :style="{background: mybackground}" :disabled="mybackground == '#333'">立即预约</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mybackground:"#1890FF",
				details:{
					content:"压维铁响时些持口商名与教场动单和起手克叫火政律开际六音院出运么验证可完院群部级每意系保须族儿为想数属等题回展铁们路两种加或说记事音比次元业习列向效后因特龙。装六产状进没本日三教用算收百消走公委力日容应话引空眼传按了专议五理部机信不离花制形候重身专图入程路不维阶情程。为安极究说量或太经因不维其法则听多工出声际你车众由委此格出还向型不目派于本须号论连音论团积先南美准存部高拉军名们选主。",
					time1:"不限制见面咨询时间，把问题分析咨询清楚",
					time2:"预约后，专属客服马上联系您"
				}
			}
		},
		onLoad(options){
			console.log(options.id)
			uni.setNavigationBarTitle({
			    title: '检测详情',
			});
			uni.setNavigationBarColor({
				backgroundColor: '#1890FF',
			})
		},
		mounted(){
			
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			order(){
				uni.showToast({
					title:"预约成功"
				})
				this.mybackground = '#333'
			}
		}
	}
</script>

<style>
	.banner image{
		width: 750rpx;
	}
	.explain{
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 19rpx 0rpx rgba(0, 0, 0, 0.11);
		border-radius: 16rpx;
		margin: auto;
		padding: 23rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
	}
	.title{
		color: #40A9FF;
		font-size: 24rpx;
		text-align: center;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 33rpx;
	}
	.content{
		color: #6A6A6A;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 30rpx;
		margin-top: 29rpx;
	}
	.list{
		display: flex;
		margin-top: 16rpx;
	}
	.list view:nth-child(1){
		color: #6A6A6A;
		font-size: 22rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		line-height: 30rpx;
	}
	.list view:nth-child(2){
		color: #6A6A6A;
		font-size: 22rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 400;
		line-height: 30rpx;
		margin-left: 8rpx;
	}
	.first{
		padding-top: 13rpx;
	}
	.explain image{
		width: 494rpx;
		height: 97rpx;
		margin: 51rpx auto;
		display: block;
	}
	.yuyue button{
		width: 680rpx;
		height: 76rpx;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		margin-top: 388rpx;
		margin-bottom: 38rpx;
	}
	.topBar{
		display: flex;
		position: absolute;
		top: 74rpx;
		color: #fff;
		width: 750rpx;
		box-sizing: border-box;
	}
	.topBar image{
		width: 50rpx;
		height: 60rpx;
		position: absolute;
		top: 0;
		left: 30rpx;
	}
	.topBar view{
		 font-family: PingFangSC-Regular, PingFang SC;
		 font-size: 36rpx;
		 line-height: 50rpx;
		 margin: 0 auto;
	}
</style>
