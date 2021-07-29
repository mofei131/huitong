<template>
	<view>
		<view class="banner">
		<image src="@/static/images/city.jpg"></image>
		<view class="dropDown">
		<view class="uni-form-item uni-column">
		          <picker @change="examinationType" :range="examinationTypeArray">
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
				<view v-for="(item,index) in iconList" @click="toUrl(item.id,item.title)">
					<image :src="item.imgUrl"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="new">
			<view class="ullist">
				<view v-for="(item,index) in data" :key = index @click="dzclick(index)" :class="{active:active == index}">
					{{item}}
				</view>
			</view>
			<view class="child" v-if="this.active == 0">
				<child :child = "info"></child>
			</view>
			<view class="child" v-if="this.active == 1">
				<child :child = "info"></child>
			</view>
			<view class="child" v-if="this.active == 2">
				<child :child = "info"></child>
			</view>
		</view>
	</view>
</template>

<script>
	import child from './new.vue'
	export default {
		components:{
		child
		},
		data() {
			return {
				examinationTypeArray:['奎文区','高新区','潍城区','寒亭区','坊子区'],
				examinationTypeIndex:0,
				examinationTypeArrayType:'奎文区',
				active: 0,
				data:["企业信息发布","政府政策","法律条文"],
				info:[
					{
						title:"山东两批返鲁援湖北医疗队员战“疫”纪实",
						date:"2020年03月18日 06:36",
						imageUrl:"https://img1.baidu.com/it/u=3131250586,3873053650&fm=26&fmt=auto&gp=0.jpg"
					},{
						title:"山东两批返鲁援湖北医疗队员战“疫”纪实",
						date:"2020年03月18日 06:36",
						imageUrl:"https://img1.baidu.com/it/u=3131250586,3873053650&fm=26&fmt=auto&gp=0.jpg"
					},{
						title:"山东两批返鲁援湖北医疗队员战“疫”纪实山东两批返鲁援湖北医疗队员战“疫”纪实",
						date:"2020年03月18日 06:36",
						imageUrl:null
					},{
						title:"山东两批返鲁援湖北医疗队员战“疫”纪实",
						date:"2020年03月18日 06:36",
						imageUrl:"https://img1.baidu.com/it/u=3131250586,3873053650&fm=26&fmt=auto&gp=0.jpg"
					}
				],
				iconList:[
					{
						id:'0',
						title:'环境保护',
						imgUrl:'../../static/images/inicon1.png'
					},{
						id:'1',
						title:'安全生产',
						imgUrl:'../../static/images/inicon2.png'
					},{
						id:'2',
						title:'职业卫生',
						imgUrl:'../../static/images/inicon3.png'
					},{
						id:'3',
						title:'消防安全',
						imgUrl:'../../static/images/inicon4.png'
					},{
						id:'4',
						title:'食品安全',
						imgUrl:'../../static/images/inicon5.png'
					},{
						id:'5',
						title:'医疗机构',
						imgUrl:'../../static/images/inicon6.png'
					},{
						id:'6',
						title:'其他行业',
						imgUrl:'../../static/images/inicon7.png'
					},{
						id:'7',
						title:'手续速办',
						imgUrl:'../../static/images/inicon8.png'
					}
				]
			}
		},
		onLoad() {
			if (!uni.getStorageSync('userInfo')) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		},
		methods: {
			dzclick(id){
				this.active = id
			},
			examinationType(e) {
				this.examinationTypeIndex = e.target.value;
				this.examinationTypeArrayType=this.examinationTypeArray[this.examinationTypeIndex]
			},
			toUrl(id,title){
				uni.navigateTo({
				    url: '/pages/index/itemList?id='+id+'&title='+title,
				});
			}
		}
	}
</script>

<style>
	.banner image{
		width: 750rpx;
		position: relative;
	}
	.iconlist{
		width: 720rpx;
		height: 340rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 4px 0px rgba(147, 147, 147, 0.5);
		border-radius: 14px;
		margin: 23rpx auto;
	}
	.iconul{
		width: 720rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.iconul view{
		width: 180rpx;
		padding-top: 25rpx;
	}
	.iconul view text{
		display: block;
		color: #666666;
		padding-top: 10rpx;
		text-align: center;
	}
	.iconul view image{
		width: 84rpx;
		height: 84rpx;
		margin: auto;
		display: block;
	}
	.ullist{
		display: flex;
		float: left;
		font-size: 30rpx;
		justify-content: start;
	}
	.ullist view{
		margin-right: 30rpx;
	}
	.new{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14px;
		margin: auto;
	}
	.ullist .active{
		border-bottom: 3px solid #1890FF;
	}
	.child{
		float: left;
		padding: 40rpx 0 60rpx 0;
	}
	.dropDown uni-view,.lauwen-select-input{
		border: 0rpx;
		width: 160rpx;
	}
	.dropDown{
		position: absolute;
		top: 60rpx;
		left: 10rpx;
		color: #fff;
	}
	.lauwen-option{
		background: #1890FF;
	}
	.rectangle{
		position: absolute;
		top: 60rpx;
		right: 10rpx;
	}
	.rectangle image{
		width: 66rpx;
		height: 66rpx;
	}
</style>
