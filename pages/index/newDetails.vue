<template>
	<view class="newdetails">
		<view class="title">{{newdetails.title}}</view>
		<view class="time">{{date}}</view>
		<view class="detimg" v-if='newdetails.detImg !== ""'>
			<image :src="newdetails.detImg"></image>
		</view>
		<view class="content">{{newdetails.content}}</view>
	</view>
</template>

<script>
	export default{
		onLoad(options){
			console.log(options.id)
		},
		data(){
			return{
				date:'',
				newdetails:{
					title:'这个省启用执业药师证书电子合格证明！与纸质证书同等效力！',
					time:'1627544688',
					detImg:'https://img0.baidu.com/it/u=1041843695,2602902676&fm=26&fmt=auto&gp=0.jpg',
					content:'根据安阳市人力资源和社会保障局发布的《关于专业技术人员职业资格证书发放管理有关问题的通知》获悉，全国统考的专业技术人员职业资格纸质证书发放到我省之前，由省人力资源和社会保障厅制发“全国专业技术人员职业资格考试合格证明（河南）”，考试成绩合格的考生可自主登录“河南省政务服务网”下载， 在省内具有纸质证书同等效力。纸质证书下发我省后，考生可向行业行政管理部门申领。在国家印制的纸质证书发放之前，可作为我省相应系列、级别专业技术职称评聘以及注册的依据。具体通知如下：关于专业技术人员职业资格证书发放管理有关问题的通知 为进一步深化“放管服”改革，优化我省专业技术人员职业资格考试工作，现就专业技术人员职业资格考试工作有关问题通知如下，请遵照执行。 '	
				}
			}
		},
		mounted() {
			var date = new Date(this.newdetails.time * 1000);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			this.date = Y + M + D + h + m + s
		},
		methods:{
			
		}
	}
</script>

<style>
	.newdetails{
		width: 680rpx;
		margin: auto;
	}
	.title{
		color: #51565D;
		font-size: 42rpx;
		margin: 44rpx 0 20rpx 0;
	}
	.time{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #9EA3A7;
		line-height: 33rpx;
	}
	.detimg image{
		width: 680rpx;
		margin: 20rpx 0 20rpx 0;
	}
	.content{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		line-height: 50rpx;
		padding-bottom: 54rpx;
	}
</style>
