<template>
	<view>
		<view class="authe">
			<view>
			<text>姓名:</text>
			<input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color: #C1C2C3;"/>
			</view>
			<text class="border"></text>
			<view>
			<text>手机号:</text>
			<input maxlength="11" type="text" v-model="phone" placeholder="请输入手机号" placeholder-style="color: #C1C2C3;"/>
			</view>
			<text class="border"></text>
			<view>
			<text>公司名称:</text>
			<input type="text" v-model="company"  placeholder="请输入公司名称" placeholder-style="color: #C1C2C3;"/>
			</view>
			<text class="border"></text>
			<view>
			<text>职务:</text>
			<input type="text" v-model="post"  placeholder="请输入职务" placeholder-style="color: #C1C2C3;"/>
			</view>
			<text class="border"></text>
			<view>
			<text>公司地址:</text>
			<input type="text" v-model="address"  placeholder="请输入公司地址" placeholder-style="color: #C1C2C3;"/>
			</view>
		</view>
		<view class="keep">
			<button @click="searchClick">保存</button>
		</view>
		<view class="dropDown">
		<view class="uni-form-item uni-column">
		          <picker class="droplist" range-key="name" @change="examinationType" :range="examinationTypeArray">
		              <label class="label">{{ examinationTypeArrayType }}</label>
						<image src="../../static/images/rightico.png"></image>
		          </picker>
		  </view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id: 0,
				examinationTypeArray: ['安全卫生','职业卫生','环境保护'],
				examinationTypeIndex: 0,
				examinationTypeArrayType: '',
				name:'',
				phone:'',
				company:'',
				post:'',
				address:'',
				arr:[]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getTypeList()
		},
		methods:{
			getTypeList() {
				let that = this
				this.http.ajax({
					url: 'video/video_class',
					method: 'GET',
					success: function(res) {
						that.examinationTypeArray = res.data
						that.examinationTypeArrayType = res.data[0].name
					}
				});
			},
			searchClick() {
				if (!this.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: 'none'
					})
					return
				}
				if (this.phone.length != 11) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					})
					return
				}
				if (!this.company) {
					uni.showToast({
						title: '请输入您的公司名称',
						icon: 'none'
					})
					return
				}
				if (!this.post) {
					uni.showToast({
						title: '请输入您的职务',
						icon: 'none'
					})
					return
				}
				if (!this.address) {
					uni.showToast({
						title: '请输入您的公司地址',
						icon: 'none'
					})
					return
				}
				let that = this
				this.http.ajax({
					url: 'user/bindInfo',
					method: 'GET',
					data: {
						user_id: uni.getStorageSync('userInfo').id,
						bind_name: this.name,
						bind_mobile: this.phone,
						bind_company: this.company,
						bind_position: this.post,
						bind_address: this.address,
						bind_peixun: this.examinationTypeArray[this.examinationTypeIndex].id,
					},
					success: function(res) {
						if (res.code == 200) {
							uni.showToast({
								title: '绑定成功！'
							})
							let userInfo = uni.getStorageSync('userInfo')
							userInfo.bind_name = that.name
							userInfo.bind_mobile = that.phone
							userInfo.bind_company = that.company
							userInfo.bind_position = that.post
							userInfo.bind_address = that.address
							userInfo.bind_peixun = that.examinationTypeArray[that.examinationTypeIndex].id
							uni.setStorageSync('userInfo', userInfo)
							setTimeout(function() {
								uni.redirectTo({
									url: '/pages/train/video?id=' + that.id,
								});
							}, 1000);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					}
				});
			},
			examinationType(e) {
			    this.examinationTypeIndex = e.target.value;
			    this.examinationTypeArrayType=this.examinationTypeArray[this.examinationTypeIndex].name
		}
	},
	}
</script>

<style>
	body{
		background: #999!important;
	}
	.authe{
		width: 720rpx;
		/* height: 484rpx; */
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		font-size: 28rpx;
		padding-left: 20rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
	}
	.authe view{
		display: flex;
		box-sizing: border-box;
		height: 104rpx;
		padding-top: 30rpx;
	}
	.authe view text{
		width: 170rpx;
		text-align: start;
	}
	.authe view input{
		width: 550rpx;
		font-size: 28rpx;
	}
	.keep button{
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
	.dropDown {
		width: 720rpx;
		margin: 24rpx auto;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		box-sizing: border-box;
		padding-top: 24rpx;
	}
	.droplist{
		width: 720rpx;
		display: flex;
		justify-content: space-between;	
		position: relative;
		color: #51565D;
		font-size: 30rpx;
		padding-left: 20rpx;
	}
	.droplist image{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		right: 0rpx;
		top:0;
	}
	.border{
		height: 1rpx;
		width: 680rpx;
		background: #e8e8e8;
		margin: auto;
		display: block;
	}
</style>
