<template>
	<view class="box">
		<swiper class="swiper" :current="sum" @change='changesum'>
			<swiper-item v-for="(item,index) in datalist" :key='index'>
					<view class="type">{{item.type == 1?'单选':'判断'}}</view>
					<view class="title">{{item.question}}</view>
					<view :class="xuanindex == 0?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_A != null" @click="xuan(0)">
						<view class="xuan">A</view>
						<view class="xiang">{{item.options_A}}</view>
					</view>
					<view :class="xuanindex == 1?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_B != null" @click="xuan(1)">
						<view class="xuan">B</view>
						<view class="xiang">{{item.options_B}}</view>
					</view>
					<view :class="xuanindex == 2?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_C != null" @click="xuan(2)">
						<view class="xuan">C</view>
						<view class="xiang">{{item.options_C}}</view>
					</view>
					<view :class="xuanindex == 3?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_D != null" @click="xuan(3)">
						<view class="xuan">D</view>
						<view class="xiang">{{item.options_D}}</view>
					</view>
					<view :class="xuanindex == 4?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_E != null" @click="xuan(4)">
						<view class="xuan">E</view>
						<view class="xiang">{{item.options_E}}</view>
					</view>
					<view :class="xuanindex == 5?'xuxi2 xuxi':'xuxi'"v-if="item.type == 1 && item.options_F != null" @click="xuan(5)">
						<view class="xuan">F</view>
						<view class="xiang">{{item.options_F}}</view>
					</view>
					<view v-if="item.type == 2">
						<view :class="xuanindex == 11?'xuxi2 xuxi':'xuxi'" @click="xuan(11)">
							<view class="xuan">1</view>
							<view class="xiang">正确</view>
						</view>
						<view :class="xuanindex == 12?'xuxi2 xuxi':'xuxi'" @click="xuan(12)">
							<view class="xuan">2</view>
							<view class="xiang">错误</view>
						</view>
					</view>
			</swiper-item>
		</swiper>
		<view class="flec">
		<view class="hui"></view>
		<view class="anbox">
		<view class="btn" @click="meij">提交答卷</view>
		<view class="xxk" @click="dtshow(1)">
			<image src="../../static/images/xuanxiangka.png"></image>
			<view class="sum">{{sum+1}}/{{totsum}}</view>
		</view>
		</view>
		</view>
		<view class="boxan" @click="dtshow" v-show="dtdan">
			<view class="dtboxwhite" @click.stop="dtshow2">
				<view class="anbox">
				<view class="dttitle">答题卡</view>
				<view class="xxk">
					<image src="../../static/images/xuanxiangka.png"></image>
					<view class="sum">{{sum+1}}/{{totsum}}</view>
				</view>
				</view>
				<view class="dtdan">
					<view class="dtdan2">
						<view :class="item.question_status == 2?(sum == index?'dtdansum':'dtdansum2'):(sum == index?'dtdansum3':'')" v-for="(item,index) in dalist" :key='index' @click="tobtn(index)">
							{{index+1}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="boxan" v-if="weida" style="z-index: 5;">
			<view class="boxwhite">
				<image @click="meid" src="../../static/images/closeimg.png"></image>
				<view class="tantit">提示</view>
				<view class="tancont">题目还未答完或未交卷，是否要退出</view>
				<view class="tanflex">
					<view class="tanleft" @click="meid">取消</view>
					<view class="tanright" @click="meidq()">确定</view>
				</view>
			</view>
		</view>
		<view class="boxan" v-if="meijiao">
			<view class="boxwhite">
				<image @click="meij" src="../../static/images/closeimg.png"></image>
				<view class="tantit">提示</view>
				<view class="tancont">题目还未答完，是否要交卷</view>
				<view class="tanflex">
					<view class="tanleft" @click="meij">取消</view>
					<view class="tanright" @click="jiaobtn()">确定</view>
				</view>
			</view>
		</view>
		<view class="boxan qiee" v-if="qie">
			<image src="../../static/images/Group.png"></image>
			<view class="qie">左右滑动切换试题</view>
			<view class="zhidaole" @click="zhi">知道了，开始答题</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				datalist:[],
				sum:0,
				xuanindex:-1,
				dtdan:false,
				weida:false,
				meijiao:false,
				qie:false,
				id:'',
				totsum:'',
				questionId:'',
				dalist:[]
			}
		},
		onLoad(p) {
			let that = this
			this.zhi()
			this.id = p.id
			this.http.ajax({
				url:'question/quitDeleteQuestion',
				method: 'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').id,
					nav_id:this.id
				},
				success: function(res) {
					// console.log(res)
					if(res.code == 200){
						that.subject()
					}else{
						uni.showToast({
							title:'试卷生成错误',
							icon:'none',
							duration:1000
						})
					}
				}
			})
		},
		onShow() {
			// console.log('id:'+uni.getStorageSync('userInfo').id)
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				this.meid()
				return true; //阻止默认返回行为
			}
		},
		onHide() {
			console.log('离开了')
		},
		methods:{
			//查询试题
			subject(){
				let that = this
				this.http.ajax({
					url: 'question/generateTestPaper',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:this.id
					},
					success: function(res) {
						console.log(res)
						if(res.code == 200){
							that.datalist = res.data.data
							that.totsum = res.data.total_sum
							that.questionId = res.data.data[0].id
						}else{
							uni.showToast({
								title:res.message,
								icon:'none',
								duration:1000
							})
						}
					}
				});
			},
			zhi(){
				this.qie = !this.qie
			},
			jiaobtn(){
				console.log('交卷')
				uni.redirectTo({
					url:'result?id='+this.id
				})
			},
			meij(){
				let that = this
				let data1 = {
					user_id:uni.getStorageSync('userInfo').id,
					nav_id:this.id,
					type:1
				}
			console.log(data1)
				this.http.ajax({
					url:'question/isQuestionEnd',
					method: 'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:this.id,
						type:1
					},
					success: function(res) {
						console.log(res)
						if(res.code == 200){
							uni.redirectTo({
								url:'result?id='+that.id
							})
						}else{
							that.meijiao = !that.meijiao
							// uni.showToast({
							// 	title:res.message,
							// 	icon:'none',
							// 	duration:1000
							// })
						}
					}
				})
			},
			meidq(){
				this.http.ajax({
					url:'question/quitDeleteQuestion',
					method: 'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:this.id
					},
					success: function(res) {
						// console.log(res)
						if(res.code == 200){
							uni.navigateBack({
								delta: 1
							});
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
			meid(){
				this.weida = !this.weida
			},
			dtshow2(){
				console.log('阻止冒泡')
			},
			dtshow(e){
				let that = this
				if(e == 1){
					this.http.ajax({
						url: 'question/questionAllDetail',
						method: 'GET',
						data: {
							user_id:uni.getStorageSync('userInfo').id,
							nav_id:this.id,
						},
						success: function(res) {
							console.log(res)
							if(res.code == 200){
								that.dalist = res.data
							}else{
								uni.showToast({
									title:res.message,
									icon:'none',
									duration:1000
								})
							}
						}
					});
				}
				this.dtdan = !this.dtdan
			},
			xuan(e){
				let that = this
				this.xuanindex = e
				this.http.ajax({
					url: 'question/updateAnswer',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						nav_id:this.id,
						question_id:this.questionId,
						answer:e == 0?'A':e == 1?'B':e == 2?'C':e == 3?'D':e == 4?'E':e ==5?'F':e == 11?'正确':'错误'
					},
					success: function(res) {
						console.log(res)
						if(res.code == 200){
							console.log(that.totsum-1)
							if(that.sum != that.totsum-1){
								that.sum = that.sum+1
							}
							console.log('已作答')
						}else{
							uni.showToast({
								title:res.message,
								icon:'none',
								duration:1000
							})
						}
					}
				});
			},
			changesum(e){
				//先查看题目是否作答
				// console.log(e.detail.current)
				let that = this
				this.http.ajax({
					url: 'question/questionDetail',
					method: 'GET',
					data: {
						user_id:uni.getStorageSync('userInfo').id,
						question_id:this.datalist[e.detail.current].id
					},
					success: function(res) {
						// console.log(res)
						if(res.code == 200){
							that.xuanindex = res.data.user_answer == 'A'?0:res.data.user_answer == 'B'?1:res.data.user_answer == 'C'?2:res.data.user_answer == 'D'?3:res.data.user_answer == 'E'?4:res.data.user_answer == 'F'?5:res.data.user_answer == '正确'?11:12
						}else{
							// uni.showToast({
							// 	title:res.message,
							// 	icon:'none',
							// 	duration:1000
							// })
						}
					}
				});
				// console.log(this.datalist[e.detail.current].id)
				this.questionId = this.datalist[e.detail.current].id
				this.sum = e.detail.current
				this.xuanindex = -1
			},
			tobtn(e){
				this.sum = e
				this.xuanindex = -1
				this.dtshow()
			}
		}
	}
</script>

<style>
	.flec{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 150rpx;
	}
	.zhidaole{
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.qie{
		font-size: 32rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		margin-bottom: 69rpx;
		text-align: center;
	}
	.qiee image{
		width: 398rpx;
		height: 254rpx;
		margin: auto;
		margin-bottom: 86rpx;
		display: block;
	}
	.qiee{
		padding-top: 50%;
	}
	.dtdan2{
		width: 707rpx;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		display: flex;
	}
	.dtdansum{
		border: 2rpx solid #1890FF!important;
		color: #1890FF!important;
		background-color: #BEE0FF;
	}
	.dtdansum2{
		color: #1890FF!important;
		background-color: #BEE0FF;
		border: 0!important;
	}
	.dtdansum3{
		border: 2rpx solid #1890FF!important;
		color: #1890FF!important;
	}
	.dtdan2 view{
		width: 74rpx;
		height: 74rpx;
		border: 2rpx solid #DBDBDB;
		border-radius: 72rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA3A7;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 27rpx;
		margin-bottom: 30rpx;
	}
	.dtdan{
		width: 680rpx;
		margin: auto;
	}
	.dttitle{
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		padding: 33rpx 0 44rpx 0;
	}
	.dtboxwhite{
		width: 750rpx;
		height: 1200rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 14rpx 14rpx 0rpx 0rpx;
		background: #FFFFFF;
	}
	/* 弹框↓ */
	.tanleft{
		width: 334rpx;
		height: 76rpx;
		background: #fff;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1rpx solid #1890FF;
	}
	.tanright{
		width: 334rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tanflex{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.tancont{
		/* width: 420rpx; */
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 40rpx;
		text-align: center;
		margin: auto;
		margin-bottom: 49rpx;
	}
	.tantit{
		font-size: 30rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-bottom: 33rpx;
		text-align: center;
	}
	.boxwhite image{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.boxwhite{
		width: 720rpx;
		/* height: 368rpx; */
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		padding: 68rpx 0 20rpx 0;
		margin-top: 50%;
		position: relative;
	}
	.boxan{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	/* 弹框↑ */
	.xuxi2 .xuan,.xuxi2 .xiang{
		color: #1890FF!important;
	}
	.sum{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.xxk image{
		width: 66rpx;
		height: 66rpx;
	}
	.xxk{
		position: absolute;
		top: 7rpx;
		right: 35rpx;
		display: flex;
		align-items: center;
	}
	.anbox{
		position: relative;
	}
	.btn{
		width: 382rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 38rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
	.hui{
		width: 750rpx;
		height: 1rpx;
		background: #D5D5D5;
		margin: auto;
	}
	.xiang{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 34rpx;
	}
	.xuan{
		width: 62rpx;
		height: 62rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 27rpx 0rpx rgba(80, 141, 139, 0.16);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 62rpx;
		font-size: 30rpx;
		font-family: Helvetica;
		color: #51565D;
	}
	.xuxi{
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.title{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 50rpx;
		margin-bottom: 70rpx;
	}
	.type{
		width: 98rpx;
		height: 38rpx;
		background: #1890FF;
		border-radius: 44rpx 33rpx 33rpx 0rpx;
		margin-bottom: 20rpx;
		font-size: 22rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.swiper swiper-item{
		padding-top: 20rpx;
		overflow: scroll;
	}
	.swiper{
		width: 680rpx;
		margin: auto;
		height: 1000rpx;
		margin-bottom: 150rpx;
	}
	page{
		background: #F4F7F7;
	}
</style>
