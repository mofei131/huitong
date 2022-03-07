<template>
	<view>
		<view class="video">
			<video x5-video-player-type='h5-page' :src="video.video" @play="playVideo" @pause="pauseVideo"
				@fullscreenchange="fullscreenchange" :poster="video.image" :show-center-play-btn="false"
				:initial-time="videoInit"
				:enable-progress-gesture="false" ref="myVideo" id="myVideo" @ended="ended" @timeupdate="timeupdate" :show-play-btn="show" auto-pause-if-navigate="true" show-loading="true">
				<!-- <cover-view @click.stop="test" class="videoback"></cover-view> -->
			</video>
		</view>
		<view class="content">
			<view class="chapter">课程简介</view>
			<view>{{video.title}}</view>
			<view v-html="video.content"></view>
			<view class="cen">
				<view>{{video.study}}人已学</view>
				<view>时长:{{video.longText}}</view>
				<view>{{video.create_time}}</view>
			</view>
		</view>
		<my-dialog :showDialog="showDialog" :content="content" @closeDialog="jixu"></my-dialog>
		<my-dialog :showDialog="showDialogWifi" :content="contentWifi" :bts="btsWifi" @clickCancel="clickCancelWifi"
			@clickConfirm="clickConfirmWifi"></my-dialog>
		<!-- <my-dialog :showDialog="showDialogOut" :content="contentOut" @closeDialog="closeDialog"></my-dialog> -->
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
					title: '播放完成'
				}],
				contentWifi: [],
				bts: [],
				btsWifi: [],
				videoTime: '',
				videoTimeNum: 0,
				xzTime: 0,
				bianhua: false,
				video: {},
				cy:false,
				show:false,
				text:'',
				videoInit:0,
				originTime:0,
				tiao:false,
				shichang:0
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		// onShow() {
		// 	this.getTime()
		// },
		
		onReady() {
			this.getTime()
			uni.showLoading({
				title:'加载中',
			})
			// setTimeout(()=>{
			// 	let that = this
				
			// },2200)
		},
		created() {
			// 创建视频实例指向视频控件
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			getTime() {
				let that = this
				let myVideo = uni.createVideoContext('myVideo')
				this.http.ajax({
					url: 'video/detail',
					method: 'GET',
					data: {
						id: this.id,
						user_id: uni.getStorageSync('userInfo').id
					},
					success: function(res) {
						that.video = res.data
						res.data.longText = that.getTimeText(parseInt(res.data.long))
						let time = res.data.now
						that.videoTimeNum = res.data.now
						that.xzTime = res.data.now
						that.shichang = res.data.long
						that.originTime = res.data.now;
						let text = that.getTimeText(time)
						that.text = that.getTimeText(time)
						// if (res.data.now == res.data.long) {
						// 	that.showDialogOut = true
						// 	that.contentOut = [{
						// 		title: '恭喜您！已完成本年度学习任务请等待证书发放'
						// 	}]
							
						// 	return
						// }
						
						
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
							
							// uni.createVideoContext('myVideo').seek(parseInt(time))
							that.time = parseInt(time)
							that.videoInit = parseInt(time);
							that.showDialog = true
							that.show = false;
						}else {
							that.show = true
							
						}
						uni.hideLoading()
						// setTimeout(() =>{
							
							
						// 	uni.hideLoading()
						// },2200)
						
					}
				});
			},
			
			jixu() {
				this.showDialog = false
				this.show = true;
				uni.getNetworkType({
					complete: e => {
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
								this.bianhua = true
								uni.createVideoContext('myVideo').play()
								// uni.createVideoContext('myVideo').seek(parseInt(time))
								break;
						}
					}
				})
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
				if(this.tiao){
					this.showDialogOut = true
					// this.contentOut = [{
					// 	title: '恭喜您！已完成本年度学习任务请等待证书发放'
					// }]
					let that = this
					this.videoTimeNum = 0
					this.http.ajax({
						url: 'video/addTime',
						method: 'GET',
						data: {
							video_id: this.id,
							user_id: uni.getStorageSync('userInfo').id,
							now: this.video.long,
							long: this.video.long,
						},
						success: function(res) {
							console.log(res)
						}
					});
				}else{
					return
				}
			},

			closeDialog() {
				this.showDialogOut = false
				uni.navigateBack({
					delta: 1
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
				this.isQuan = e.detail.fullScreen
			},

			playVideo(e) {
				this.bianhua = true
				this.tiao = false
			},

			pauseVideo(e) {
				// console.log(e)
			},
			timeupdate(e) {
				// console.log(e)
				// console.log(e.detail.currentTime, this.xzTime)
				let currentTime = e.detail.currentTime == 0 ? this.originTime : e.detail.currentTime; 
				// console.log(currentTime);
				if ((currentTime - parseInt(this.xzTime) > 2 || currentTime - parseInt(this.xzTime) < -2) && this.bianhua) {
						let myVideo = uni.createVideoContext('myVideo')
						myVideo.pause()
						myVideo.seek(parseInt(this.xzTime))
						uni.showModal({
							title: '提示',
							content: '您不能调整时间！',
							success: () => {
								myVideo.play()
							}
						})
						return
					}
				this.xzTime = currentTime
				if((currentTime - this.shichang) < 1 && currentTime > (this.shichang-5)){
					this.tiao = true
				}
					
				if (parseInt(this.videoTimeNum) + 5 == parseInt(currentTime)) {
					this.videoTimeNum = parseInt(currentTime)
					let that = this
					this.http.ajax({
						url: 'video/addTime',
						method: 'GET',
						data: {
							video_id: this.id,
							user_id: uni.getStorageSync('userInfo').id,
							now: parseInt(currentTime),
							long: this.video.long,
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
	/* .uni-video-progress-container{
		pointer-events: none!important;
	}
	.uni-video-progress{
		pointer-events: none!important;
		
	} */
	.video {
		position: relative;
	}

	.video video {
		width: 750rpx;
		margin-top: 8rpx;
		z-index: 10;
	}

	.videoback {
		position: absolute;
		bottom: 0rpx;
		height: 90rpx;
		width: 540rpx;
		left: 90rpx;
		z-index: 99999;
		/* background-color: #007AFF; */
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

	.button1 {
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

	.button2 {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 680rpx;
		height: 76rpx;
		background: #999;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		bottom: 72rpx;
	}
</style>
