<template>
	<view>
		<view class="video">
			<cover-view@click.stop="test" v-if="!isQuan" class="noquanback">
				</cover-view>
				<video x5-video-player-type='h5-page' :src="video.video" @play="playVideo" @pause="pauseVideo"
					@fullscreenchange="fullscreenchange" :poster="video.cover"
					:show-center-play-btn="false" :enable-progress-gesture="false" ref="myVideo" id="myVideo"
					@ended="ended" @timeupdate="timeupdate">

					<cover-view @click.stop="test" v-if="isQuan" class="quanback"></cover-view>
				</video>
		</view>
		<view class="content">
			<view class="chapter">课程简介</view>
			<view>{{video.title}}</view>
			<view v-html="video.content"></view>
			<view class="cen">
				<view>{{video.study}}人已学</view>
				<view>时长:{{video.long}}</view>
				<view>{{video.create_time}}</view>
			</view>
		</view>
		<my-dialog :showDialog="showDialog" :content="content" :bts="bts" @clickCancel="clickCancel"
			@clickConfirm="clickConfirm"></my-dialog>
		<my-dialog :showDialog="showDialogWifi" :content="contentWifi" :bts="btsWifi" @clickCancel="clickCancelWifi"
			@clickConfirm="clickConfirmWifi"></my-dialog>
		<my-dialog :showDialog="showDialogOut" :content="contentOut" @closeDialog="closeDialog"></my-dialog>
		<!-- <view class="buy">
			<button @click="pay(video.id,video.price,video.chapter)">立即购买</button>
		</view> -->
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				isQuan: false,
				videoContext: {},
				showDialog: false,
				showDialogOut: false,
				showDialogWifi: false,
				time: 0,
				content: [],
				contentOut: [{
					title: '恭喜您！已完成本年度学习任务请等待证书发放'
				}],
				contentWifi: [],
				bts: [],
				btsWifi: [],
				videoTime: '',
				videoTimeNum: 0,
				video: {}
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onReady() {
			this.getTime()
		},
		created() {
			// 创建视频实例指向视频控件
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			videoTimeUpdateEvent(e) { // 播放进度改变
				// e.detail.currentTime为每次触发时,视频的当前播放时间
				let currentTime = Number(e.detail.currentTime);
				console.log('播放进度条改变', currentTime)
				if (currentTime == e.detail.duration) {
					uni.showModal({
						title: '提示',
						content: '恭喜您！已完成本年度学习任务请等待证书发放',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				// 试看结束 this.class_info.freed_time为试看时间
				// if (currentTime >= this.class_info.freed_time) {
				// 	// 试看结束,在这做一些想做的操作,例如停止视频播放
				// 	this.videoContext.exitFullScreen();
				// 	this.videoContext.pause();
				// 	this.videoContext.seek(0);
				// }
			},

			getTime() {
				let that = this
				this.http.ajax({
					url: 'video/detail',
					method: 'GET',
					data: {
						id: this.id,
						user_id: uni.getStorageSync('userInfo').id
					},
					success: function(res) {
						that.video = res.data
						let time = res.data.now
						that.videoTimeNum = res.data.now
						let text = that.getTimeText(time)
						if (time > 0) {
							that.content = [{
									title: '您上次观看到'
								},
								{
									title: ' ' + text + ' ',
									color: '#1890FF'
								},
								{
									title: '是否继续观看'
								}
							]
							that.bts = [{
									title: '取消',
									background: '#fff',
									borderColor: '#1890FF',
									color: '#1890FF'
								},
								{
									title: '继续观看',
									background: '#1890FF',
									borderColor: '#1890FF',
									color: '#fff'
								},
							]
							that.time = time
							that.showDialog = true
						}
					}
				});
			},

			getTimeText(time) {
				let h = parseInt(time / 3600)
				let m = parseInt((time / 60) - (h * 60))
				let s = time % 60
				h = h < 10 ? '0' + h : h
				m = m < 10 ? '0' + m : m
				s = s < 10 ? '0' + s : s
				return h + ':' + m + ':' + s
			},

			ended() {
				this.showDialogOut = true
				this.contentOut = [{
					title: '恭喜您！已完成本年度学习任务请等待证书发放'
				}]
				let that = this
				this.videoTimeNum = 0
				this.http.ajax({
					url: 'video/addTime',
					method: 'GET',
					data: {
						video_id: this.id,
						user_id: uni.getStorageSync('userInfo').id,
						now: 69,
						long: 69,
					},
					success: function(res) {
						console.log(res)
					}
				});
			},

			closeDialog() {
				this.showDialogOut = false
			},

			clickCancel() {
				this.showDialog = false
				uni.getNetworkType({
					complete: e => {
						console.log(e)
						switch (e.networkType) {
							case '2g':
							case '3g':
							case '4g':
							case '5g':
								this.showDialogWifi = true,
									this.contentWifi = [{
										title: '您正在使用移动网络,继续观看会耗费通讯流量'
									}]
								this.btsWifi = [{
										title: '取消',
										background: '#fff',
										borderColor: '#1890FF',
										color: '#1890FF'
									},
									{
										title: '继续观看',
										background: '#1890FF',
										borderColor: '#1890FF',
										color: '#fff'
									},
								]
								break;
							default:
								uni.createVideoContext('myVideo').play()
								break;
						}
					}
				})
			},

			clickConfirm() {
				this.showDialog = false
				uni.getNetworkType({
					complete: e => {
						console.log(e)
						switch (e.networkType) {
							case '2g':
							case '3g':
							case '4g':
							case '5g':
								this.showDialogWifi = true,
									this.contentWifi = [{
										title: '您正在使用移动网络,继续观看会耗费通讯流量'
									}]
								this.btsWifi = [{
										title: '取消',
										background: '#fff',
										borderColor: '#1890FF',
										color: '#1890FF'
									},
									{
										title: '继续观看',
										background: '#1890FF',
										borderColor: '#1890FF',
										color: '#fff'
									},
								]
								uni.createVideoContext('myVideo').seek(this.time)
								break;
							default:
								uni.createVideoContext('myVideo').seek(this.time)
								uni.createVideoContext('myVideo').play()
								break;
						}
					}
				})
			},

			clickCancelWifi() {
				this.showDialogWifi = false
			},

			clickConfirmWifi() {
				this.showDialogWifi = false
				uni.createVideoContext('myVideo').play()
			},
			pay(id, price, chapter) {
				uni.navigateTo({
					url: '/pages/train/pay?id=' + id + '&price=' + price + '&chapter=' + chapter,
				})
			},

			fullscreenchange(e) {
				console.log(e)
				this.isQuan = e.detail.fullScreen
			},

			playVideo(e) {
				// console.log(e)
			},

			pauseVideo(e) {
				// console.log(e)
			},
			
			timeupdate(e) {
				if (parseInt(this.videoTimeNum) + 5 == parseInt(e.detail.currentTime)) {
					this.videoTimeNum = parseInt(e.detail.currentTime)
					let that = this
					this.http.ajax({
						url: 'video/addTime',
						method: 'GET',
						data: {
							video_id: this.id,
							user_id: uni.getStorageSync('userInfo').id,
							now: parseInt(e.detail.currentTime),
							long: 69,
						},
						success: function(res) {
							console.log(res)
						}
					});
				}
			},
		}
	}
</script>

<style>
	.video {
		position: relative;
	}

	.video video {
		width: 750rpx;
		margin-top: 8rpx;
		z-index: 10;
	}

	.noquanback {
		position: absolute;
		bottom: 5rpx;
		height: 80rpx;
		width: 610rpx;
		left: 70rpx;
		z-index: 99999999;
	}

	.quanback {
		position: absolute;
		bottom: 5rpx;
		height: 80rpx;
		width: 610rpx;
		left: 70rpx;
		z-index: 99999999;
	}

	.content {
		width: 680rpx;
		margin: auto;
	}

	.chapter {
		color: #51565D;
		font-size: 28rpx;
		border-left: 6rpx solid #1890FF;
		width: 142rpx;
		text-align: center;
		margin: 54rpx 0 20rpx 0;
	}

	.content view:nth-child(2) {
		color: #51565D;
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}

	.content view:nth-child(3) {
		color: #51565D;
		font-size: 26rpx;
		line-height: 37rpx;
	}

	.cen {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.cen view {
		font-size: 24rpx !important;
		color: #9EA3A7 !important;
	}

	.buy button {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		bottom: 72rpx;
	}
</style>
