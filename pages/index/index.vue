<template>
	<view>
		<view class="banner">
			<swiper style="width: 100%;height: 437rpx;" autoplay circular>
				<swiper-item v-for="(item, index) in bannerList">
					<image :src="item.image" @click="toPage(item.url)"></image>
				</swiper-item>
			</swiper>
			<view class="dropDown">
				<view class="uni-form-item uni-column">
					<picker @change="examinationType" range-key="name" :value="examinationTypeIndex" :range="examinationTypeArray">
						<label class="">{{ examinationTypeArrayType }}</label>
					</picker>
				</view>
			</view>
			<!-- <view class="rectangle">
				<image src="@/static/images/Rectangle.png" mode=""></image>
			</view> -->
		</view>
		<view class="iconlist">
			<view class="iconul">
				<view v-for="(item,index) in iconList" @click="toUrl(item.id,item.name)">
					<image :src="item.image"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="new">
			<view class="ullist">
				<view v-for="(item,index) in data" :key=index @click="dzclick(item.id)" :class="{active:active == item.id}">
					{{item.title}}
				</view>
			</view>
			<view class="child">
				<child :child="info" :type="active"></child>
			</view>
		</view>
	</view>
</template>

<script>
	import child from './new.vue'
	export default {
		components: {
			child
		},
		data() {
			return {
				examinationTypeArray: [],
				examinationTypeIndex: 0,
				examinationTypeArrayType: '',
				bannerList: [],
				active: 'companyNews',
				page: 1,
				limit: 10,
				data: [{title: '企业信息发布', id: 'companyNews'}, {title: '政府政策', id: 'policyNews'}, {title: '法律条文', id: 'lawNews'}],
				info: [],
				iconList: [],
				adcode:'',
				ioscode:'',
				adurl:'',
				iosurl:''
			}
		},
		onLoad() {
			if (!uni.getStorageSync('userInfo').id) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
			this._load()
			// setInterval(, 5000 )
			console.log(uni.base64ToArrayBuffer('test'))
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				return true; //阻止默认返回行为
			}
		},
		onShow() {
			this.jiazai()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
			jiazai(){
				let that = this;
				this.http.ajax({
					url: 'index/version',
					method: 'GET',
					data:{},
					success(res) {
						console.log(res)
						that.adcode = res.data.ANDROID_VERSION
						that.ioscode = res.data.IOS_VERSION
						that.adurl = res.data.ANDROID_link
						that.iosurl = res.data.ISO_link
						uni.getSystemInfo({
							success: (res) => {
								//检测当前平台，如果是安卓则启动安卓更新  
									if (res.platform == "android") {
										if(plus.runtime.version != that.adcode){
											uni.showModal({
												title: "发现新版本",
												content: "确认下载更新",
												success: (res) => {
													if (res.confirm) { //当用户确定更新，执行更新
														uni.showLoading({
															title: '更新中……'
														})
														console.log(that.adurl)
														uni.downloadFile({ //执行下载
															url: that.adurl, //下载地址
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
													}else if (res.cancel) {
															that.jiazai()
													}
												}
											})
										}
								}else{
									console.log('ios')
									if(plus.runtime.version != that.ioscode){
										uni.showModal({
											title: "发现新版本",
											content: "确认下载更新",
											success: (res) => {
												if (res.confirm) { //当用户确定更新，执行更新
													console.log(that.iosurl)
													let url = escape(that.iosurl)
													console.log(url)
													uni.downloadFile({ //执行下载
														url: url, //下载地址
														success: downloadResult => { //下载成功
															let appleId= 1579844008
															plus.runtime.launchApplication({
																	action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
															}, function(e) {
																	console.log('Open system default browser failed: ' + e.message);
															});
														},fail(d){
															console.log(d)
														}
													});
												}else if (res.cancel) {
														that.jiazai()
												}
											}
										})
									}
									
								}
							}
						});
					}
				});
			},
			_load() {
				this.getBanner();
				this.getIcon();
				this.getCity();
			},
			getBanner() {
				let that = this
				this.http.ajax({
					url: 'index/banner',
					method: 'GET',
					success: function(res) {
						that.bannerList = res.data
					}
				});
			},
			getIcon() {
				let that = this
				this.http.ajax({
					url: 'index/navigate',
					method: 'GET',
					success: function(res) {
						that.iconList = res.data
					}
				});
			},
			getCity() {
				let that = this
				this.http.ajax({
					url: 'news/city',
					method: 'GET',
					success: function(res) {
						that.examinationTypeArray = res.data
						if (wx.getStorageInfoSync('city')) {
							let has = false
							for (let i in res.data) {
								if (res.data[i].name == wx.getStorageSync('city')) {
									that.examinationTypeIndex = i
									that.examinationTypeArrayType = res.data[i].name
									has = true
									break;
								}
							}
							if (!has) {
								that.examinationTypeArrayType = res.data[0].name
								that.examinationTypeIndex = 0
								uni.setStorageSync('city', res.data[0].name)
							}
							that.getList()
						} else {
							that.examinationTypeArrayType = res.data[0].name
							that.examinationTypeIndex = 0
							uni.setStorageSync('city', res.data[0].name)
							that.getList()
						}
					}
				});
			},
			getList() {
				let that = this
				this.http.ajax({
					url: 'news/list',
					method: 'GET',
					data: {
						page: this.page,
						limit: this.limit,
						type: this.active,
						// type: 'policyNews',
						city_id: this.examinationTypeArray[this.examinationTypeIndex].id
					},
					success: function(res) {
						that.info = that.info.concat(res.data)
						console.log(that.info)
					}
				});
			},
			dzclick(id) {
				this.active = id
				this.info = []
				this.page = 1
				this.getList()
			},
			examinationType(e) {
				this.examinationTypeIndex = e.target.value;
				this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex].name
				uni.setStorageSync('city', this.examinationTypeArrayType)
				this.getList()
			},
			examinationTypeChange(e) {
				console.log(e)
			},
			toUrl(id, title) {
				uni.navigateTo({
					url: '/pages/index/itemList?id=' + id + '&title=' + title,
				});
			},
			toPage(url) {
				uni.navigateTo({
					url: url,
				});
			}
		}
	}
</script>

<style>
	.banner image {
		width: 750rpx;
		position: relative;
	}

	.iconlist {
		width: 720rpx;
		height: 340rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 4px 0px rgba(147, 147, 147, 0.5);
		border-radius: 14px;
		margin: 23rpx auto;
	}

	.iconul {
		width: 720rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.iconul view {
		width: 180rpx;
		padding-top: 25rpx;
	}

	.iconul view text {
		display: block;
		color: #666666;
		padding-top: 10rpx;
		text-align: center;
		font-size: 25rpx;
	}

	.iconul view image {
		width: 84rpx;
		height: 84rpx;
		margin: auto;
		display: block;
	}

	.ullist {
		display: flex;
		float: left;
		font-size: 30rpx;
		justify-content: start;
	}

	.ullist view {
		margin-right: 30rpx;
	}

	.new {
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14px;
		margin: auto;
		margin-top: 43rpx;
	}

	.ullist .active {
		border-bottom: 3px solid #1890FF;
	}

	.child {
		float: left;
		padding: 40rpx 0 60rpx 0;
	}

	.dropDown uni-view,
	.lauwen-select-input {
		border: 0rpx;
		width: 160rpx;
	}

	.dropDown {
		position: absolute;
		top: 60rpx;
		left: 10rpx;
		color: #fff;
	}

	.lauwen-option {
		background: #1890FF;
	}

	.rectangle {
		position: absolute;
		top: 60rpx;
		right: 10rpx;
	}

	.rectangle image {
		width: 66rpx;
		height: 66rpx;
	}
</style>
