<template>
	<view>
		<!-- :class="disabled ? 'autheDis' : ''" -->
		<view class="authe">
			<view>
			<text>姓名:</text>
			<input type="text" :disabled="disabled" v-model="name" placeholder="请输入姓名" />
			</view>
			<text class="border"></text>
			<view>
			<!-- <text>姓名:</text>
			<input type="text" :disabled="disabled" v-model="name" placeholder="请输入姓名" /> -->
			<text>性别:</text>
			<picker class="gather" @change="anjianChange1" :value="index1" :range="array1" range-key="record">
				<view class="flex-row">
					<text>{{array1[index1].record}}</text>
					<image src="../../static/images/rzai.png"></image>
				</view>
			</picker>
			</view>
			<text class="border"></text>
			<view>
			<text>身份证号:</text>
			<input maxlength="18" :disabled="disabled" type="text" v-model="cardno" placeholder="请输入身份证号" />
			</view>
			<text class="border"></text>
			<view>
			<text>手机号:</text>
			<input maxlength="11" :disabled="disabled" type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<text class="border"></text>
			<view>
			<text>公司名称:</text>
			<input type="text" :disabled="disabled" v-model="company"  placeholder="请输入公司名称" />
			</view>
			<text class="border"></text>
			<view>
			<!-- <text>姓名:</text>
			<input type="text" :disabled="disabled" v-model="name" placeholder="请输入姓名" /> -->
			<text>职务:</text>
			<picker class="gather" @change="anjianChange2" :value="index2" :range="array2" range-key="record">
				<view class="flex-row">
					<text>{{array2[index2].record}}</text>
					<image src="../../static/images/rzai.png"></image>
				</view>
			</picker>
			</view>
			<!-- <view>
			<text>职务:</text>
			<input type="text" :disabled="disabled" v-model="post"  placeholder="请输入职务" />
			</view>
			<text class="border"></text>
			<view>
			<text>公司地址:</text>
			<input type="text" :disabled="disabled" v-model="address"  placeholder="请输入公司地址" />
			</view> -->
		</view>
		<!-- <view :class="disabled ? 'autheDis' : ''" class="authe">
		</view> -->
		<view class="keep">
			<button @click="searchClick" v-if="!disabled">保存</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				company:'',
				post:'',
				address:'',
				disabled: false,
				array1: [{
					record: '男',id:1
				}, {
					record: '女',id:2
				}],
				index1: 0,
				array2: [{
					record: '管理员',id:0
				}, {
					record: '负责人',id:1
				}],
				index2: 0,
				cardno:''
			}
		},
		onLoad() {
			// let userInfo = wx.getStorageSync('userInfo')
			// this.name = userInfo.bind_name ? userInfo.bind_name : ''
			// this.phone = userInfo.bind_mobile ? userInfo.bind_mobile : ''
			// this.company = userInfo.bind_company ? userInfo.bind_company : ''
			// this.post = userInfo.bind_position ? userInfo.bind_position : ''
			// this.address = userInfo.bind_address ? userInfo.bind_address : ''
			// if (userInfo.bind_name) this.disabled = true
		},
		onNavigationBarButtonTap(e) {
			this.disabled = false
		},
		methods:{
			anjianChange2(e) {
				this.index2 = e.detail.value;
			},
			anjianChange1(e) {
				this.index1 = e.detail.value;
			},
			searchClick() {
				if (!this.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: 'none',
					})
					return
				}
				if (this.phone.length != 11) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none',
					})
					return
				}
				if (!this.company) {
					uni.showToast({
						title: '请输入公司名称',
						icon: 'none',
					})
					return
				}
				if (this.cardno.length != 18) {
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none',
					})
					return
				}
				uni.showLoading({title: '绑定中',mask:true});
				let that = this
				this.http.ajax({
					url: 'user/bindInfo',
					method: 'GET',
					data: {
						user_id: wx.getStorageSync('userInfo').id,
						bind_name: this.name,
						bind_mobile: this.phone,
						bind_company: this.company,
						bind_position: this.index2 == 0?'管理员':'负责人',
						bind_address: this.address,
						bind_sex:this.index1,
						bind_id:this.cardno
					},
					success: function(res) {
						if (res.code == 200) {
							uni.hideLoading();
							uni.showToast({
								title: '绑定成功！'
							})
							uni.setStorageSync('userInfo', res.data)
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.gather text{
		width: 500rpx!important;
		/* margin-top: 0rpx!important; */
	}
	.flex-row{
		padding-top: 0rpx!important;
		color: grey;
		padding-left: 15rpx;
		box-sizing: border-box;
	}
	.gather{
		width: 550rpx;
	}
	.flex-row image{
		width: 66rpx;
		height: 66rpx;
	}
	.border{
		width: 680rpx;
		height: 1rpx;
		background-color: #E8E8E8;
		margin: auto;
	}
	body{
		/* background: #fff!important; */
		background: #F4F7F7; 
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
	.autheDis view input{
		color: #999;
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
</style>