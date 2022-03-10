<template>
	<view>
		<view class="itemlist">
			<view class="listitem" @tap="modifyphone()">
				<view class="list">
					<view>修改手机号</view>
					<image src="@/static/images/rightico.png"></image>
				</view>
			</view>
			<view class="listitem" @tap="modifypassword()">
				<view class="list">
					<view>修改登录密码</view>
					<image src="@/static/images/rightico.png"></image>
				</view>
			</view>
			<view class="listitem">
				<view class="updata">
					<view>
					<view class="reddian" v-if="hasNew"></view>
					<view @click="doUpData()">APP更新</view>
					</view>
					<view>
						<view class="banben">{{banben}}</view>
					</view>
				</view>
			</view>
			<view class="listitem" @tap="tologin()">
				<view class="list">
					<view>注销账号</view>
					<image src="@/static/images/rightico.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasNew: false,
				banben:''
			}
		},
		onShow() {
			this.getVersion()
		},
		methods: {
			modifyphone() {
				uni.navigateTo({
					url: '/pages/mine/modifyphone'
				})
			},
			modifypassword() {
				uni.navigateTo({
					url: '/pages/mine/modifypassword'
				})
			},

			getVersion() {
				let that = this
				this.http.ajax({
					url: 'index/version',
					method: 'GET',
					success: function(request) {
						if (request.code == 200) {
							plus.runtime.getProperty(plus.runtime.appid, function(inf) {
								let platform = uni.getSystemInfoSync().platform
								that.banben = inf.version 
								if (platform == 'ios') {
									if (inf.version != request.data.IOS_VERSION) {
										that.hasNew = true
										that.link = request.data.ISO_link
									}
								} else if (platform == 'android') {
									if (inf.version != request.data.ANDROID_VERSION) {
										that.hasNew = true
										that.link = request.data.ANDROID_link
									}
								}
							});
						}
					}
				});
			},
			doUpData() {
				let link = this.link
				if (this.hasNew) {
					uni.showModal({
						title: "发现新版本",
						content: "确认下载更新",
						success: (res) => {
							if (res.confirm == true) { //当用户确定更新，执行更新
								uni.showLoading({
									title: '更新中……'
								})
								uni.downloadFile({ //执行下载
									url: link, //下载地址
									success: downloadResult => { //下载成功
										uni.hideLoading();
										if (downloadResult.statusCode == 200) {
											uni.showModal({
												title: '',
												content: '更新成功，确定现在重启吗？',
												confirmText: '重启',
												confirmColor: '#EE8F57',
												success: function(res) {
													if (res.confirm) {
														plus.runtime.install( //安装
															downloadResult
															.tempFilePath, {
																force: true
															},
															function(res) {
																utils.showToast(
																	'更新成功，重启中');
																plus.runtime
																	.restart();
															}
														);
													}
												}
											});
										}
									}
								});
							}
						}
					})
				} else {
					uni.showToast({
						title: '已经是最新版本啦！',
						icon: 'none'
					})
				}
			},

			tologin() {
				uni.showModal({
					title: '提示',
					content: '您确定要退出登录吗?',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
	.itemlist {
		width: 720rpx;
		margin: auto;
	}

	.list {
		display: flex;
		justify-content: space-between;
	}

	.list image {
		width: 66rpx;
		height: 66rpx;
	}

	.list view {
		padding-top: 12rpx;
		box-sizing: border-box;
	}

	.listitem {
		margin-top: 50rpx;
	}

	.updata {
		position: relative;
		display: flex;
		justify-content: space-between;
	}
	.banben{
		margin-right: 30rpx;
		color: #333;
	}
	.reddian {
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		background: #FF4F47;
		left: 130rpx;
		top: 0;
		border-radius: 50%;
		
	}
</style>
