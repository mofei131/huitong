<template>
	<view class="info">
		<view>
			<view>
				<view class="listItem" v-for="(item,index) in child" @click="toDetail(item.id)">
					<view class="listleft">
					<view>
						{{item.title}}
					</view>
					<view>
						{{item.create_time}}
					</view>
					</view>
					<view class="listright" v-if="item.image">
						<image :src="item.image"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["child", "type"],
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/newDetails?id=' + id + '&type=' + this.type
				})
			},
		},
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
	.listleft {
		width: 470rpx;
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
	/* .listright{
		width: 220rpx;
		height: 124rpx;
		margin: 0 22rpx 0 22rpx;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		listright image {
			width: 100%;
		 }
	} */
</style>
