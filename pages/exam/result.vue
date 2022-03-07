<template>
	<view class="box">
		<view class="topbox">
			<image src="../../static/images/Group6.png" mode=""></image>
			<view class="fen">{{result.total_points}}<span>分</span></view>
			<view class="tongwei">{{result.total_points < result.pass_score?'抱歉，您未通过本次考试':'您通过了本次考试'}}</view>
		</view>
		<view class="botbox">
			<view class="dtjieguo"><view></view>答题结果</view>
			<view class="dtqiy"><span>考试专业：</span>{{result.major}}</view>
			<view class="dtqiy"><span>题目数量：</span>{{result.question_sum}}题</view>
			<view class="dtqiy"><span>答题数量：</span>{{result.test_num}}题</view>
			<view class="dtqiy"><span>答对题目：</span>{{result.test_right_num}}题</view>
		</view>
		<view class="hui"></view>
		<view class="zsbox">
			<view class="zhengshu" v-if="result.status == 1" @click="topage(3)">重新学习</view>
			<view class="zhengshu" v-if="result.total_points < result.pass_score && result.status != 1" @click="topage(1)">重新考试</view>
			<view class="zhengshu" v-if="result.total_points >= result.pass_score && result.status != 1" @click="topage(2)">查看证书</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				result:''
			}
		},
		onLoad(p) {
			let that = this
			this.id = p.id
			this.http.ajax({
				url:'question/calculationAnswer',
				method: 'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').id,
					nav_id:this.id
				},
				success: function(res) {
					console.log(res.data)
					if(res.code == 200){
						that.result = res.data
					}else{
						uni.showToast({
							title:res.message,
							icon:'none',
							duration:1000
						})
					}
				}
			})
		},
		methods:{
			topage(e){
				if(e == 1){
					uni.redirectTo({
						url:'exam?id='+this.id
					})
				}else if(e ==2){
					uni.navigateTo({
						url:'zhengshu?id='+this.id
					})
				}else if(e == 3){
					uni.switchTab({
						url:'../train/fenlei'
					})
				}
			}
		}
	}
</script>

<style>
	.zhengshu{
		margin: auto;
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 72rpx;
	}
	.zsbox{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.hui{
		width: 750rpx;
		height: 12rpx;
		background: #FAFAFA;
		margin: auto;
		margin-top: 30rpx;
	}
	.dtqiy{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 55rpx;
	}
	.dtqiy span{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA3A7;
		margin-right: 70rpx;
		line-height: 55rpx;
	}
	.dtjieguo{
		font-size: 28rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-bottom: 18rpx;
		display: flex;
	}
	.dtjieguo view{
		width: 6rpx;
		height: 28rpx;
		background-color: #1890FF;
		margin-right: 9rpx;
	}
	.botbox{
		width: 680rpx;
		margin: auto;
		padding-top: 24rpx;
	}
	.tongwei{
		font-size: 30rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		text-align: center;
	}
	.fen span{
		font-size: 30rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		margin-left: 6rpx;
	}
	.fen{
		font-size: 114rpx;
		font-family: DINCondensed-Bold, DINCondensed;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 137rpx;
		text-align: center;
	}
	.topbox image{
		width: 300rpx;
		height: 300rpx;
		margin: auto;
		display: block;
	}
	.topbox{
		width: 750rpx;
		/* height: 690rpx; */
		background: url(../../static/images/Combined.png) no-repeat;
		background-position: bottom;
		background-size: 100%;
		padding: 44rpx 0 45rpx 0;
	}
	page{
		padding: 0;
		margin: 0;
		background-color: #fff;
	}
</style>
