<template>
	<view class="itemList">
	<view class="listItem" v-for="(item,index) in itemList" @click="toUrl(item.id)">
		<view class="listLeft">
			<view>{{item.name}}</view>
			<view>{{item.sub_name}}</view>
		</view>
		<view class="listRight">
			<view>查看详情</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				id: 0,
				page: 1,
				limit: 10,
				itemList:[]
			}
		},
		onLoad(options){
			uni.setNavigationBarTitle({
			    title: options.title,
			});
			this.id = options.id
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods:{
			toUrl(id){
				uni.navigateTo({
				    url: '/pages/index/itemDetails?id='+id,
				});
			},
			
			getList () {
				let that = this
				this.http.ajax({
					url: 'service/list',
					method: 'GET',
					data: {
						nav_id: this.id,
						page: this.page,
						limit: this.limit,
					},
					success: function(res) {
						that.itemList = that.itemList.concat(res.data)
					}
				});
			},
		},
	}
</script>

<style>
	body{
		background: #F4F7F7!important;
	}
	.itemList{
		width: 720rpx;
		background: #F4F7F7!important;
		margin: auto;
		box-sizing: border-box;
	}
	.listItem{
		display: flex;
		margin-top: 20rpx;
		box-sizing: border-box;
		border-radius: 14rpx;
		background: #fff;
	}
	.listLeft{
		width: 490rpx;
	}
	.listLeft view:nth-child(1){
		color: #51565D;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		line-height: 40px;
		font-weight: 500;
		padding: 20rpx;
		padding-bottom: 0rpx;
	}
	.listLeft view:nth-child(2){
		color: #51565D;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		line-height: 33rpx;
		word-wrap:break-word;
		padding: 20rpx;
		padding-top: 0rpx;
	}
	.listRight{
		width: 158rpx;
		/* margin-left: 32rpx; */
		margin: auto;
	}
	.listRight view{
		width: 158rpx;
		height: 50rpx;
		background: #1890FF;
		border-radius: 25rpx;
		color: #fff;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		line-height: 53rpx;
		text-align: center;
		display: block;
		/* margin-top: 10rpx; */
	}
</style>
