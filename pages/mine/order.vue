<template>
	<view>
	<!-- <view class="title">
		<view class="topTitle">环保检测</view>
	</view> -->
	<view class="uniList">
		<view class="uniListItem" v-for="(item,index) in order">
			<view class="order">
				<view class="orderLeft">
					<view>{{item.name}}</view>
					<view>{{item.content}}</view>
				</view>
				<view class="orderRight">
				<view :class="{active:item.whether == 1}" v-if="item.whether == 1">已预约</view>
				<view v-if="item.whether == 0">未预约</view>
				</view>
			</view>
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
						that.order = that.order.concat(res.data)
					}
				});
			},
		},
	}
</script>

<style>
	.uniList{
		width: 720rpx;
		height: 170rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
	}
	.order{
		display: flex;
		margin-top: 70rpx;
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
		margin-top: 40rpx;
	}
	.active{
		background: #FFB932!important;
	}
</style>
