<template>
	<view class="box">
		<image :src="imgUrl"></image>
		<button class="bendi" @tap="saveImgToLocal()">保存图片</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				openSettingBtnHidden: true,
				id:'',
				imgUrl:''
			}
		},
		onLoad(p) {
			this.id = p.id
		},
		onShow() {
			this.pullurl()
		},
		methods:{
			pullurl(){
				uni.showLoading({title: '加载中',mask:true});
				let that = this
				this.http.ajax({
					url:'question/certificate',
					method: 'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:this.id
					},
					success: function(res) {
						uni.hideLoading();
						// console.log(res)
						if(res.code == 200){
							that.imgUrl = res.data
						}else{
							uni.showToast({
								title:res.message,
								icon:'none',
								duration:1000
							})
						}
					}
				})
			},
			//微信小程序保存到相册
			        handleSetting(e){
								let that = this
			            if (!e.detail.authSetting['scope.writePhotosAlbum']) {
			                  that.openSettingBtnHidden = false;
			            } else {
			                 that.openSettingBtnHidden = true;
			            }
			        },
			        saveEwm:function(e){
								let that = this
			            //获取相册授权
			               uni.getSetting({
			                 success(res) {
			                   if (!res.authSetting['scope.writePhotosAlbum']) {
			                     uni.authorize({
			                       scope: 'scope.writePhotosAlbum',
			                       success() {
			                         //这里是用户同意授权后的回调
			                         that.saveImgToLocal();
			                       },
			                       fail() {//这里是用户拒绝授权后的回调
			                           that.openSettingBtnHidden=false
			                       }
			                     })
			                   } else {//用户已经授权过了
			                     that.saveImgToLocal();
			                   }
			                 }
			               })
			        },
			        saveImgToLocal:function(e){
			            let that = this
			            uni.showModal({
										title: '提示',
										content: '确定保存到相册吗',
										success: function (res) {
											if (res.confirm) {
													uni.downloadFile({
														url: that.imgUrl,//图片地址
														success: (res) =>{
															if (res.statusCode === 200){
																	uni.saveImageToPhotosAlbum({
																			filePath: res.tempFilePath,
																			success: function() {
																					uni.showToast({
																							title: "保存成功",
																							icon: "none"
																					});
																			},
																			fail: function() {
																					uni.showToast({
																							title: "保存失败",
																							icon: "none"
																					});
																			}
																	});
															} 
													}
											}) 
										} else if (res.cancel) {
												
										}
								}
						});
						
				},
		}
	}
</script>

<style>
	.box image{
		width: 750rpx;
		height: 547rpx;
		margin: auto;
		display: block;
	}
	.box{
		padding-top: 72rpx;
	}
	.bendi{
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		margin-top: 373rpx;
	}
</style>
