<template>
	<view>
		<view class="video">
			<video :src="video.url" :show-play-btn="false" :show-center-play-btn="false"
				:enable-progress-gesture="false" ref="myVideo" id="myVideo" @ended="ended"></video>
		</view>
		<view class="content">
			<view class="chapter">课程简介</view>
			<view>{{video.chapter}}</view>
			<view>{{video.brief}}</view>
			<view class="cen">
				<view>{{video.cen}}人已学</view>
				<view>时长:{{video.time}}</view>
				<view>{{video.date}}</view>
			</view>
		</view>
		<my-dialog :showDialog="showDialog"
		:content="content"
		:bts="bts"
		@clickCancel="clickCancel"
		@clickConfirm="clickConfirm"
		></my-dialog>
		<my-dialog :showDialog="showDialogWifi"
		:content="contentWifi"
		:bts="btsWifi"
		@clickCancel="clickCancelWifi"
		@clickConfirm="clickConfirmWifi"
		></my-dialog>
		<my-dialog :showDialog="showDialogOut"
		:content="contentOut"
		@closeDialog="closeDialog"
		></my-dialog>
		<view class="buy">
			<button>立即购买</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoContext: {},
				showDialog: false,
				showDialogOut: false,
				showDialogWifi: false,
				time: 0,
				content: [],
				contentOut: [
					{
						title: '恭喜您！已完成本年度学习任务请等待证书发放'
					}
				],
				contentWifi: [],
				bts: [],
				btsWifi: [],
				video: {
					cover:"https://img2.baidu.com/it/u=4267680702,373970169&fm=26&fmt=auto&gp=0.jpg",
					url: "https://video.pearvideo.com/mp4/adshort/20210727/cont-1736568-15730255_adpkg-ad_hd.mp4",
					chapter: "第一章：基础护理知识和技能",
					brief: "位提级放关增手响边价本问争史 院书称九省导上政同权取合技家新制容准证红最流算节深米证干院流四维年无实再入南证社联进他。手反难高此义当商社进头商调完时以今过家车克公必他青采资为斗长就期来集入思当打满你各气认任节飞广家却直长。空以细领那话教般属理消风北化步习叫际了题事好选会正同满次火场期化会南见等类理方结电米知是在便作本步易料更名白内力查广合海见人周好命内十发论原她。",
					cen: 99,
					time: '00:00:59',
					date: '2020-03-27'
				}
			}
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
				let time = 10
				let h = parseInt(time / 3600)
				let m = parseInt((time / 60) - (h * 60))
				let s = time % 60
				h = h < 10 ? '0' + h : h
				m = m < 10 ? '0' + m : m
				s = s < 10 ? '0' + s : s
				if (time > 0) {
					this.content = [
						{
							title: '您上次观看到'
						},
						{
							title: ' ' + h + ':' + m + ':' + s + ' ',
							color: '#1890FF'
						},
						{
							title: '是否继续观看'
						}
					]
					this.bts = [
						{
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
					this.time = time
					this.showDialog = true
					// uni.showModal({
					// 	title: '提示',
					// 	content: '您上次观看到' + h + ':' + m + ':' + s + '是否继续观看',
					// 	confirmText: "继续观看",
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			that.time = time
					// 			uni.createVideoContext('myVideo').seek(that.time)
					// 			uni.createVideoContext('myVideo').play()
					// 		} else if (res.cancel) {
					// 			uni.createVideoContext('myVideo').play()
					// 		}
					// 	}
					// });
				} else {
					uni.createVideoContext('myVideo').play()
				}
			},
			
			ended() {
				this.showDialogOut = true
				this.contentOut = [
					{
						title: '恭喜您！已完成本年度学习任务请等待证书发放'
					}
				]
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
								this.contentWifi = [
									{
										title: '您正在使用移动网络,继续观看会耗费通讯流量'
									}
								]
								this.btsWifi = [
									{
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
								this.contentWifi = [
									{
										title: '您正在使用移动网络,继续观看会耗费通讯流量'
									}
								]
								this.btsWifi = [
									{
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
		}
	}
</script>

<style>
	.video video {
		width: 750rpx;
		margin-top: 8rpx;
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
