<template>
	<view class="details">
		<image></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(options){
			console.log(options.id)
			uni.setNavigationBarTitle({
			    title: '检测详情',
			});
			uni.setNavigationBarColor({
				backgroundColor: '#1890FF',
			})
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>
