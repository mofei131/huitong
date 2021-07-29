<template>
	<view class="info">
		<view>
			<view>
				<view class="listItem" v-for="(item,index) in child" @tap="toUrl(item.id)">
					<view class="listleft">
					<view>
						{{item.title}}
					</view>
					<view>
						{{item.date}}
					</view>
					</view>
					<view class="listright" v-if="item.imageUrl !== null ">
					<view>
						<image :src="item.imageUrl"></image>
					</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["child"],
		methods:{
			toUrl(id){
				uni.navigateTo({
				    url: '/pages/index/newDetails?id='+id,
				});
			}
		}
	}
</script>

<style>
	.info{
		display: block;
	}
	.listItem{
		display: flex;
		padding-bottom: 30rpx;
	}
	.listleft view{
		padding-bottom: 9rpx;
	}
	.listleft view:nth-child(1){
		color: #51565D;
		font-size: 32rpx;
		line-height: 45rpx;
	}
	.listleft view:nth-child(2){
		color: #9EA3A7;
		font-size: 24rpx;
	}
	.listright image{
		width: 220rpx;
		height: 124rpx;
		margin: 0 22rpx 0 22rpx;
	}
</style>
