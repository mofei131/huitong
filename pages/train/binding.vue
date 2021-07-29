<template>
	<view>
		<view class="authe">
			<view>
			<text>姓名:</text>
			<input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view>
			<text>手机号:</text>
			<input type="text" v-model="phone" placeholder="请输入手机号" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view>
			<text>公司名称:</text>
			<input type="text" v-model="company"  placeholder="请输入公司名称" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view>
			<text>职务:</text>
			<input type="text" v-model="post"  placeholder="请输入职务" placeholder-style="color: #C1C2C3;"/>
			</view>
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
		          <picker class="droplist" @change="examinationType" :range="examinationTypeArray">
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
				examinationTypeArray: ['安全卫生','职业卫生','环境保护'],
				examinationTypeIndex: 0,
				examinationTypeArrayType: '安全卫生',
				name:'',
				phone:'',
				company:'',
				post:'',
				address:'',
				arr:[]
			}
		},
		methods:{
			searchClick() {
				this.arr = [this.name,this.phone,this.company,this.post,this.address]
				console.log(this.arr);
			},
			examinationType(e) {
			    this.examinationTypeIndex = e.target.value;
			    this.examinationTypeArrayType=this.examinationTypeArray[this.examinationTypeIndex]
		}
	},
	}
</script>

<style>
	body{
		background: #fff!important;
	}
	.authe{
		width: 720rpx;
		height: 484rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		font-size: 28rpx;
		padding-left: 20rpx;
	}
	.authe view{
		display: flex;
		margin: 50rpx 0 50rpx 0;
		box-sizing: border-box;
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
	}
	.droplist{
		width: 720rpx;
		display: flex;
		justify-content: space-between;	
		position: relative;
	}
	.droplist image{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		right: 0rpx;
		top:0;
	}
</style>
