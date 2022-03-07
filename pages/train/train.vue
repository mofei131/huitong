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
					<view class="wanch">
						<view>共:{{item.long}}</view>
						<view v-if="item.see_status == 1">已完成</view>
					</view>
					
				</view>
			</view>
		</view>
		<!-- <view class="nofind">
			<image src="@/static/images/nofind.png"></image>
		</view> -->
		<view class="boxan" v-if="kaobox">
			<view class="boxwhite">
				<image src="../../static/images/closeimg.png" @click="tanhide"></image>
				<view class="tantit">提示</view>
				<view class="tancont">您已学完所有课程，可以考试啦！快去试试吧！</view>
				<view class="tanflex">
					<view class="tanleft" @click="tanhide">稍后再说</view>
					<view class="tanleft" @click="topage()">前往考试</view>
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
				searchBox: '',
				id:'',
				//注：项目完成已修改
				kaobox:false
			}
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		onLoad(p) {
			this.id = p.id
			this.getList()
		},
		onShow() {
			let that = this
			this.http.ajax({
				url: 'question/isAllWatched',
				method: 'GET',
				data: {
					nav_id:this.id,
					user_id:uni.getStorageSync('userInfo').id
				},
				success: function(res) {
					console.log('看没看完')
					console.log(res)
					if(res.code == 200){
						that.tanhide()
					}else{
						console.log(res.message)
					}
				}
			});
		},
		methods: {
			tanhide(){
				this.kaobox = !this.kaobox
			},
			topage(){
				uni.redirectTo({
					url:'../exam/exam?id='+this.id
				})
			},
			openinfo(id, time) {
				if (uni.getStorageSync('userInfo').bind_mobile) {
					uni.navigateTo({
						url: '/pages/train/video?id=' + id,
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未绑定信息，是否前往绑定',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/train/binding?id=' + id,
								});
							}
						}
					})
				}
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
						nav_id:this.id,
						user_id:uni.getStorageSync('userInfo').id
					},
					success: function(res) {
						that.videoList = that.videoList.concat(res.data)
						console.log(res.data)
					}
				});
			},
		}
	}
</script>

<style>
	.tanleft{
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
	.tanflex{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.tancont{
		width: 420rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 40rpx;
		text-align: center;
		margin: auto;
		margin-bottom: 49rpx;
	}
	.tantit{
		font-size: 30rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-bottom: 33rpx;
		text-align: center;
	}
	.boxwhite image{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.boxwhite{
		width: 720rpx;
		/* height: 368rpx; */
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		padding: 68rpx 0 20rpx 0;
		margin-top: 50%;
		position: relative;
	}
	.boxan{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	
	
	.wanch{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
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
		background: #f4f4f4;
		border-radius: 0 32rpx 32rpx 0;
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
		/* background-color: #fff;
		padding: 20rpx;
		border-radius: 15rpx;
		box-sizing: border-box; */
	}
	.wanch view{
		color: #9EA3A7!important;
		font-size: 24rpx!important;
		line-height: 33rpx;
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
	.nofind image{
		width: 750rpx;
		margin: 100rpx auto;
	}
</style>
