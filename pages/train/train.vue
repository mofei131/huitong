<template>
	<view>
	<view class="search">
		<image src="@/static/images/seache.png"></image>
		<input type="text" focus 
		    placeholder="请输入关键字" 
		    placeholder-style="font-size:30rpx;color:#B5B9BF"
			 v-model="fname"
			   value="1"
			   @focus="search_site"/>
			<image src="@/static/images/close.png" @click="clearInput('fname')"></image>
			<text @click="clearInput('fname')">取消</text>
	</view>
	<view class="videList">
		<view class="viewItem" v-for="(item,index) in videoList" @click="openinfo(item.id,item.time)">
			<view class="itemLeft">
				<image :src="item.cover"></image>
			</view>
			<view class="itemRight">
				<view>{{item.title}}</view>
				<view>讲师:{{item.lecturer}}</view>
				<view>共:{{item.duration}}分钟</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				videoList:[
					{
						id:0,
						time:'13.00',
						title:"主管护师-录播系列主管护师-录播系列",
						lecturer:"怎么肥四",
						duration:480,
						cover:"https://img2.baidu.com/it/u=4267680702,373970169&fm=26&fmt=auto&gp=0.jpg"
					},{
						id:1,
						time:'15.00',
						title:"视频标题测试",
						lecturer:"怎么肥四",
						duration:360,
						cover:"https://img2.baidu.com/it/u=4267680702,373970169&fm=26&fmt=auto&gp=0.jpg"
					},{
						id:2,
						time:'35.23',
						title:"视频标题测试2",
						lecturer:"怎么肥四",
						duration:580,
						cover:"https://img2.baidu.com/it/u=4267680702,373970169&fm=26&fmt=auto&gp=0.jpg"
					}
				]
			}
		},
		mounted(){
		     this.init(); 
		},
		methods:{
			 openinfo(id,time) {
			            uni.navigateTo({
			                url: '/pages/train/video?id='+id+'&time='+time,
			            });
			        },
			init(){
			          //调用后台接口获取数据展示到页面中
			     },
			     search(value){
			          let _self =this;
			          if(!value){
			             _self.siteDatas=[];
			             return;
			           };
			           //调用后台接口获取数据展示到页面中
			     },
			     // 点击取消按钮清空输入框
			     clearInput(val) {
			           this[val] ="";
			           this.siteDatas=[];
			           this.init();
			     },
			     // 站点输入框模糊查询
			     search_site(){
			           if(document.querySelector('input')==document.activeElement){
			                  //往输入框中传入值，根据值调后台接口进行查询
			                  this.search(this.fname.trim());
			            }
			            if(this.fname ==''){
			                   //当输入框为空的时候再次调用接口显示全部数据
			                   this.init();
			             }
			    }
		},
		watch: {
		    fname:function(){       //调用模糊查询函数
		        this.search_site();
		    }
		}
	}
</script>

<style>
	.search{
		display: flex;
		justify-content: center;
		margin-top: 32rpx;
	}
	.search image{
		width: 66rpx;
		height: 66rpx;
	}
	.search input{
		line-height: 40rpx;
		width: 470rpx;
		height: 64rpx;
	}
	.search text{
		color: #51565D;
		font-size: 28rpx;
		margin-left: 23rpx;
		padding-top: 15rpx;
	}
	.videList{
		width: 680rpx;
		margin: auto;
	}
	.itemLeft image{
		width: 260rpx;
		height: 146rpx;
	}
	.viewItem{
		display: flex;
		margin-top: 35rpx;
	}
	.itemRight{
		color: #9EA3A7;
		font-size: 24rpx;
		line-height: 33rpx;
		width: 400rpx;
		margin-left: 20rpx;
	}
	.itemRight view{
		margin-bottom: 5rpx;
	}
	.itemRight view:nth-child(1){
		color: #51565D;
		font-size: 28rpx;
		line-height: 36rpx;
	}
</style>
