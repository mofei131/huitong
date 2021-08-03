<template>
	<view>
	<!-- <view class="title">
		<view class="topTitle">环保检测</view>
	</view> -->
	<view class="uniList">
		<view class="uniListItem" v-for="(item,index) in order" @click="toDetail(item.service_id)" v-if="order.length != 0">
			<view class="order">
				<view class="orderLeft">
					<view>{{item.htService.name}}</view>
					<view>{{item.htService.sub_name}}</view>
				</view>
				<view class="orderRight">
				<view class="active">已预约</view>
				</view>
			</view>
		</view>
		<view v-if="order.length == 0" class="notfound">
			<image src="@/static/images/notfund.png" class="notfoundimage"></image>
			<text class="notfoundtext">暂无内容</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page: 1,
				limit: 10,
				order:[]
			}
		},
		onLoad() {
		},
		onShow() {
			this.page = 1
			this.limit = 1
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				this.http.ajax({
					url: 'service/myAppoinment',
					method: 'GET',
					data: {
						user_id: wx.getStorageSync('userInfo').id,
						page: this.page,
						limit: this.limit,
					},
					success: function(res) {
						if(res.code == 200){
							that.order = that.order.concat(res.data)
						}else if(res.code == -2){
							uni.showModal({
								title:'提示',
								content:'您在未进行企业认证，请前往认证',
								success:function(res){
									if(res.confirm){
										uni.navigateTo({
											url:'/pages/mine/authe'
										})
									}else{
										uni.navigateBack({
											delta:1
										})
									}
								}
							})
						}
						
					}
				});
			},
			toDetail(id){
				uni.navigateTo({
				    url: '/pages/index/itemDetails?id='+id,
				});
			},
		},
	}
</script>

<style>
	body{
		background: #F4F7F7!important;
	}
	.uniList{
		/* width: 720rpx;
		height: 170rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto; */
		width: 720rpx;
		background: #F4F7F7!important;
		margin: auto;
		box-sizing: border-box;
	}
	.uniListItem{
		display: flex;
		margin-top: 20rpx;
		box-sizing: border-box;
		border-radius: 14rpx;
		background: #fff;
	}
	.order{
		display: flex;
		/* margin-top: 70rpx; */
		margin: 30rpx 0 20rpx 0;
	}
	.orderLeft{
		width: 490rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.orderLeft view:nth-child(1){
		color: #51565D;
		font-size: 28rpx;
		padding-bottom: 14rpx;
	}
	.orderLeft view:nth-child(2){
		color: #51565D;
		font-size: 24rpx;
	}
	.orderRight{
		width: 210rpx;
		/* margin-left: 32rpx; */
		margin: auto;
	}
	.orderRight view{
		width: 158rpx;
		height: 50rpx;
		background: #777;
		border-radius: 25rpx;
		color: #fff;
		text-align: center;
		line-height: 50rpx;
		margin: auto;
		display: block;
		/* margin-top: 40rpx; */
	}
	.active{
		background: #FFB932!important;
	}
	.notfound{
		width: 100%;
	}
	.notfoundimage{
		width: 100%;
		margin-top: 100rpx;
	}
	.notfoundtext{
		width: 100%;
		font-size: 36rpx;
		text-align: center;
		color: #333;
		font-weight: 500;
		display: block;
	}
</style>
