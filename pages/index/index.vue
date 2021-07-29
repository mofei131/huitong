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
			<view class="rectangle">
				<image src="@/static/images/Rectangle.png" mode=""></image>
			</view>
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
				<child :child="info"></child>
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
				iconList: []
			}
		},
		onLoad() {
			if (!uni.getStorageSync('userInfo').id) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
			this._load()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
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
						city_id: this.examinationTypeArray[this.examinationTypeIndex].id
					},
					success: function(res) {
						that.info = res.data
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
