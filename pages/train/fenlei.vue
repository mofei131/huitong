<template>
	<view>
		<view class="datalist" v-for="(item,index) in fenList" :key="index">
			<view class="left">
				<view class="leftl">
					<image :src="item.images" mode="aspectFit"></image>
				</view>
				<view class="leftr">
					<view>{{item.name}}</view>
					<view>价格：¥{{item.price}}</view>
					<view>时间：{{item.long}}分钟</view>
				</view>
			</view>
			<view class="right">
				<view class="btn" v-if="item.pay" @click="topage(item)">进入学习</view>
				<view class="btn btn2" v-else @click="xianpay(item)">立即购买</view>
			</view>
		</view>
		<view class="huibox" v-if="show">
			<view class="neibox">
				<image src="../../static/images/close.png" @click="show = !show"></image>
				<view class="title">课程分类详情</view>
				<view class="cont">{{content}}</view>
				<view class="dis">
					<view @click="show = !show">取消</view>
					<view @click="topay()">立即购买</view>
				</view>
			</view>
		</view>
		<view>
				<!-- <video src="https://zaihang.oss-cn-beijing.aliyuncs.com/%E4%B8%89%E5%90%8C%E6%97%B6%E5%9F%B9%E8%AE%AD.mp4"
						:initial-time="15" :autoplay='true'></video>
						<video src="https://zaihang.oss-cn-beijing.aliyuncs.com/%E8%81%8C%E4%B8%9A%E5%8D%AB%E7%94%9F%E7%AE%A1%E7%90%86-1.mp4"
								:initial-time="15" :autoplay='true'></video> -->
								<video src="http://hlstore.yimetal.cn/2022/three~1.mp4"
										:initial-time="15" :autoplay='true'></video>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				fenList:[],
				content:'',
				show:false,
				id:'',
				name:'',
				price:''
			}
		},
		onShow() {
			if(!uni.getStorageSync('userInfo').bind_mobile){
				uni.navigateTo({
					url:'binding'
				})
			}
			this.fenlist()
		},
		methods:{
			topage(e){
				this.http.ajax({
					url: 'question/isQuestionEnd',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:e.id,
						type:2
					},
					success: function(res) {
						console.log(res)
						if (res.code == 200) {
							uni.navigateTo({
								url:'../exam/zhengshu?id='+e.id
							})
						} else {
							uni.navigateTo({
								url:'train?id='+e.id
							})
						}
					}
				});
			},
			topay(){
				this.show = false
				uni.navigateTo({
					url:'pay?id='+this.id+'&name='+this.name+'&price='+this.price
				})
			},
			xianpay(e){
				this.content = e.desc
				this.id = e.id
				this.price = e.price
				this.name = e.name
				this.show = !this.show
			},
			// 查询分类
			fenlist(){
				let that  = this
				this.http.ajax({
					url: 'video/video_class',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id
					},
					success: function(res) {
						if (res.code == 200) {
							console.log(res.data)
							that.fenList = res.data
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
	.dis view:nth-child(2){
		width: 334rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dis view:nth-child(1){
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		border: 1rpx solid #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dis{
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-bottom: 20rpx;
	}
	.cont{
		width: 681rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin: auto;
		margin-bottom: 60rpx;
		text-align: center;
	}
	.title{
		font-size: 30rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #51565D;
		text-align: center;
		padding-top: 39rpx;
		margin-bottom: 43rpx;
	}
	.neibox image{
		position: absolute;
		top: 0;
		right: 0;
		width: 80rpx;
		height: 80rpx;
	}
	.neibox{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		position: relative;
		margin-top: 40%;
	}
	.huibox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	.btn2{
		background: #1890FF!important;
	}
	.btn{
		width: 158rpx;
		height: 50rpx;
		background: #FFB932;
		border-radius: 25rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.leftr view:nth-child(1){
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		margin-bottom: 22rpx;
	}
	.leftr view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		margin-bottom: 16rpx;
	}
	.leftr view:nth-child(3){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA3A7;
	}
	.leftr{
		padding-left: 16rpx;
	}
	.leftl image{
		width: 260rpx;
		height: 146rpx;
	}
	.left{
		display: flex;
		align-items: center;
	}
	.datalist{
		width: 720rpx;
		height: 170rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12rpx 20rpx 12rpx 12rpx;
		box-sizing: border-box;
	}
	page{
		background: #F4F7F7;
	}
</style>
