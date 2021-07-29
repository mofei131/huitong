<template>
	<view>
		<view class="search">
			<image src="@/static/images/seache.png"></image>
			<input type="text" placeholder="请输入关键字" placeholder-style="font-size:30rpx;color:#B5B9BF" @input="searchVideo" />
			<image src="@/static/images/close.png"></image>
			<text>取消</text>
		</view>
		<view class="videList">
			<view class="viewItem" v-for="(item,index) in videoList" @click="openinfo(item.id,item.time)">
				<view class="itemLeft">
					<image :src="item.image"></image>
				</view>
				<view class="itemRight">
					<view>{{item.title}}</view>
					<view>讲师:{{item.lecturer}}</view>
					<view>共:{{item.long}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				videoList: [],
				searchBox: ''
			}
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		onLoad() {
			this.getList()
		},
		methods: {
			openinfo(id, time) {
				uni.navigateTo({
					url: '/pages/train/video?id=' + id,
				});
			},

			searchVideo(e) {
				this.searchBox = e.detail.value
				this.page = 1
				this.videoList = []
				this.getList()
			},
			getList() {
				let that = this
				this.http.ajax({
					url: 'video/list',
					method: 'GET',
					data: {
						title: this.searchBox,
						page: this.page,
						limit: this.limit,
					},
					success: function(res) {
						that.videoList = that.videoList.concat(res.data)
					}
				});
			},
		}
	}
</script>

<style>
	.search {
		display: flex;
		justify-content: center;
		margin-top: 32rpx;
	}

	.search image {
		width: 66rpx;
		height: 66rpx;
	}

	.search input {
		line-height: 40rpx;
		width: 470rpx;
		height: 64rpx;
	}

	.search text {
		color: #51565D;
		font-size: 28rpx;
		margin-left: 23rpx;
		padding-top: 15rpx;
	}

	.videList {
		width: 680rpx;
		margin: auto;
	}

	.itemLeft image {
		width: 260rpx;
		height: 146rpx;
	}

	.viewItem {
		display: flex;
		margin-top: 35rpx;
	}

	.itemRight {
		color: #9EA3A7;
		font-size: 24rpx;
		line-height: 33rpx;
		width: 400rpx;
		margin-left: 20rpx;
	}

	.itemRight view {
		margin-bottom: 5rpx;
	}

	.itemRight view:nth-child(1) {
		color: #51565D;
		font-size: 28rpx;
		line-height: 36rpx;
	}
</style>
