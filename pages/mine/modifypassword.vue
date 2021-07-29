<template>
	<view>
		<view class="itemlist">
			<view class="listitem">
				<input type="number" class="old" v-model="password1" placeholder="旧密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" @tap="close1()"></image>
			</view>
			<view class="listitem">
				<input type="number" class="password" v-model="password2" placeholder="新密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" @tap="close2()"></image>
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="listitem">
				<input type="number" class="password" v-model="password3" placeholder="确认新密码" placeholder-style="color: #5D5D61;"/>
				<image src="@/static/images/close.png" @tap="close3()"></image>
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
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
			}
		}
	}
</script>

<style>
</style>
