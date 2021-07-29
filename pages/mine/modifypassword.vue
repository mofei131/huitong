<template>
	<view>
		<view class="itemlist">
			<view class="listitem">
				<input :type="inputType" class="old" v-model="password1" :password="!showPassword" maxlength="32" placeholder="旧密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" class="close" @tap="close1()"></image>
			</view>
			<view class="listitem">
				<input :type="inputType" class="password" v-model="password2" :password="!showPassword" maxlength="32" placeholder="新密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" class="close" @tap="close2()"></image>
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="listitem">
				<input :type="inputType" class="password" v-model="password3" :password="!showPassword" maxlength="32" placeholder="确认新密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" class="close" @tap="close3()"></image>
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="ming">
				<view>密码为6-20位，可由数字、字母、符号组成。</view>
			</view>
		</view>
		<view class="modify">
			<view>保存</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				password1:'',
				password2:'',
				password3:'',
				showPassword: false,
				inputType: "text",
			}
		},
		methods:{
			close1(){
				this.password1 = ""
			},
			close2(){
				this.password2 = ""
			},
			close3(){
				this.password3 = ""
			},
			display() {
				this.showPassword = !this.showPassword
			}
		}
	}
</script>

<style>
	.itemlist{
		width: 680rpx;
		margin: auto;
		padding-top: 25rpx;
	}
	.listitem{
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.close,.img{
		width: 66rpx;
		height: 66rpx;
		
	}
	.old{
		width: 610rpx;
		height: 76rpx;
		background: #F4F4F4;
		border-radius: 39rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		outline: none;
		border: 0;
	}
	.password{
		width: 548rpx;
		height: 76rpx;
		background: #F4F4F4;
		border-radius: 39rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		outline: none;
		border: 0;
	}
	.ming{
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 30rpx;
		margin-top: 18rpx;
	}
	.modify{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 72rpx;
		margin: 0 auto;
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		color: #fff;
		font-size: 28rpx;
		bottom: 72rpx;
		text-align: center;
		line-height: 70rpx;
	}
</style>
