<template>
	<view class="itemList">
	<view class="listItem" v-for="(item,index) in itemList">
		<view class="listLeft">
			<view>{{item.title}}</view>
			<view>{{item.content}}</view>
		</view>
		<view class="listRight">
			<view @click="toUrl(item.id)">查看详情</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				itemList:[
					{
						id:'0',
						title:'环保检测',
						content:'不要以“为别人考虑”做理由，其实丢弃了“舍我其谁”的使命',
					},{
						id:'1',
						title:'环保检测2',
						content:'不要以“为别人考虑”做理由，其实丢弃了“舍我其谁”的使命',
					},{
						id:'2',
						title:'环保检测3',
						content:'不要以“为别人考虑”做理由，其实丢弃了“舍我其谁”的使命',
					}
				]
			}
		},
		methods:{
			toUrl(id){
				uni.navigateTo({
				    url: '/pages/index/itemDetails?id='+id,
				});
			}
		},
		onLoad(options){
			console.log(options.id)
			uni.setNavigationBarTitle({
			    title: options.title,
			});
		},
	}
</script>

<style>
	.itemList{
		padding-top: 20rpx;
	}
	.listItem{
		display: flex;
		width: 720rpx;
		margin: auto;
		margin-bottom: 20rpx;
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
	}
	.listLeft view:nth-child(2){
		color: #51565D;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		line-height: 33rpx;
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
		margin-top: 60rpx;
	}
</style>
