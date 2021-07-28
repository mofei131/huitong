<template>
	<view>
		<view class="back" v-if="showDialog">
			<view class="dialog">
				<view class="dialog-title">{{title}}</view>
				<view class="dialog-content">
					<text :style="'color:' + (item.color ? item.color : '#333')"
						v-for="(item, index) in content">{{item.title}}</text>
				</view>
				<view class="dialog-bts" v-if="bts.length == 2">
					<view class="dialog-bt1"
					@click="clickCancel"
					:style="{'color': bts[0].color, 'background': bts[0].background, 'border': '1rpx solid ' + bts[0].borderColor}">{{bts[0].title}}</view>
					<view class="dialog-bt2"
					@click="clickConfirm"
					:style="{'color': bts[1].color, 'background': bts[1].background, 'border': '1rpx solid ' + bts[1].borderColor}">{{bts[1].title}}</view>
				</view>
				<view class="dialog-bt3"
					:style="{'color': bts[0].color, 'background': bts[0].background, 'border': '1rpx solid ' + bts[0].borderColor}"
					v-if="bts.length == 1" @click="closeDialog">{{bts[0].title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		name: 'myDialog',
		props: {
			// 是否展示弹窗
			showDialog: {
				type: Boolean,
				default: false
			},
			// 弹窗的头部内容
			title: {
				type: String,
				default: '提示'
			},
			/* 弹窗的内容
				这个要传数组，内容为
				[
					{
						title: // 段落内容
						color: // 这段字的颜色，不传默认为#000
					}
				]
			*/
			content: {
				type: Array,
				default: () => []
			},
			/* 弹窗的按钮
				这是个数组，内容为
				[
					{
						title: // 按钮文字
						color: // 按钮文字颜色
						background: // 按钮别景色
						borderColor: // 按钮边框色
					}
				]
			*/
			bts: {
				type: Array,
				default: () => [{
						title: '确定',
						background: '#1890FF',
						borderColor: '#1890FF',
						color: '#fff'}],
				},
			},

			created() {
				console.log(this.showDialog)
			},

			methods: {
				// 关闭弹窗事件
				closeDialog() {
					this.$emit('closeDialog');
				},
				// 取消事件
				clickCancel() {
					this.$emit('clickCancel');
				},
				// 确认事件
				clickConfirm() {
					this.$emit('clickConfirm');
				},
			}
		}
</script>

<style>
	.back {
		background-color: rgba(0, 0, 0, .4);
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog {
		box-sizing: border-box;
		width: 720rpx;
		padding: 50rpx 20rpx 20rpx;
		background-color: #fff;
		border-radius: 14rpx;
	}

	.dialog-title {
		width: 100%;
		font-size: 30rpx;
		color: #51565D;
		text-align: center;
		margin-bottom: 35rpx;
	}

	.dialog-content {
		width: 100%;
		font-size: 28rpx;
		color: #51565D;
		text-align: center;
		margin-bottom: 48rpx;
	}

	.dialog-bts {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 680rpx;
	}

	.dialog-bt1 {
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 28rpx;
	}

	.dialog-bt2 {
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 28rpx;
	}

	.dialog-bt3 {
		margin: 0 auto;
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 28rpx;
	}
</style>
