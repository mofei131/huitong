<template>
	<view class="newdetails">
		<view class="title">{{newdetails.title}}</view>
		<view class="time">{{newdetails.create_time}}</view>
		<view class="detimg" v-if='newdetails.image !== ""'>
			<image :src="newdetails.image"></image>
		</view>
		<view class="content" v-html="newdetails.content"></view>
	</view>
</template>

<script>
	export default{
		onLoad(options){
			this.id = options.id
			if (options.type == 'companyNews') {
				this.getCompanyDetail()
			} else if (options.type == 'policyNews') {
				this.getPolicyDetail()
			} else if (options.type == 'lawNews') {
				this.getLawDetail()
			}
		},
		data(){
			return{
				newdetails:{}
			}
		},
		mounted() {
			var date = new Date(this.newdetails.time * 1000);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			this.date = Y + M + D + h + m + s
		},
		methods:{
			getCompanyDetail() {
				let that = this
				this.http.ajax({
					url: 'news/companyDetail',
					method: 'GET',
					data: {
						news_id: this.id
					},
					success: function(res) {
						that.newdetails = res.data
					}
				});
			},
			getPolicyDetail() {
				let that = this
				this.http.ajax({
					url: 'news/policyDetail',
					method: 'GET',
					data: {
						news_id: this.id
					},
					success: function(res) {
						that.newdetails = res.data
					}
				});
			},
			getLawDetail() {
				let that = this
				this.http.ajax({
					url: 'news/lawDetail',
					method: 'GET',
					data: {
						news_id: this.id
					},
					success: function(res) {
						that.newdetails = res.data
					}
				});
			},
		}
	}
</script>

<style>
	.newdetails{
		width: 680rpx;
		margin: auto;
	}
	.title{
		color: #51565D;
		font-size: 42rpx;
		margin: 44rpx 0 20rpx 0;
	}
	.time{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA3A7;
		line-height: 33rpx;
	}
	.detimg image{
		width: 680rpx;
		margin: 20rpx 0 20rpx 0;
	}
	.content{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 50rpx;
		padding-bottom: 54rpx;
	}
</style>
