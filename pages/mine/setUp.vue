<template>
	<view>
		<view class="itemlist">
			<view class="listitem" @tap="modifyphone()">
				<view class="list">
					<view>修改手机号</view>
					<image src="@/static/images/rightico.png"></image>
				</view>
			</view>
			<view class="listitem">
				<view class="list">
					<view>修改登录密码</view>
					<image src="@/static/images/rightico.png"></image>
				</view>
			</view>
			<view class="listitem">
				<view class="updata">
					<view>APP更新</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			modifyphone(){
				uni.navigateTo({
					url:'/pages/mine/modifyphone'
				})
			}
		}
	}
</script>

<style>
	.itemlist{
		width: 720rpx;
		margin: auto;
	}
	.list{
		display: flex;
		justify-content: space-between;
	}
	.list image{
		width: 66rpx;
		height: 66rpx;
	}
	.list view{
		padding-top: 12rpx;
		box-sizing: border-box;
	}
	.listitem{
		margin-top: 50rpx;
	}
</style>
