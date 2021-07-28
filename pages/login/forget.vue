<template>
  <view class="content">
    <view class="list">
      <view class="tishi">忘记密码</view>
      <view class="list-call">
        <input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
		 <view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
      </view>
      <view class="list-call">
        <input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" :password="!showPassword" />
        <image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
      </view>
      <view class="list-call">
        <input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
      </view>
    </view>
	<view class="agreement">
		<text>密码为6-20位，可由数字、字母、符号组成。</text>
	</view>
    <view class="button-login" hover-class="button-hover" @tap="bindLogin()">
      <text>修改密码</text>
    </view>

  </view>
</template>

<script>
  var _this, js;
  export default {
    data() {
      return {
        phone: '',
        second: 0,
        code: "",
        showPassword: false,
        password: ''
      }
    },
    onLoad() {
      _this = this;
    },
    computed: {
      yanzhengma() {
        if (this.second == 0) {
          return '获取验证码';
        } else {
          if (this.second < 10) {
            return '重新获取0' + this.second;
          } else {
            return '重新获取' + this.second;
          }
        }
      }
    },
    onUnload() {
      this.clear()
    },
    methods: {
      display() {
        this.showPassword = !this.showPassword
      },
      clear(){
        clearInterval(js)
        js = null
        this.second = 0
      },
      getcode() {
        if (this.phone.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.second > 0) {
          return;
        }
        _this.second = 60;
        js = setInterval(function() {
          _this.second--;
          if (_this.second == 0) {
            _this.clear()
          }
        }, 1000)
        uni.request({
          url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
          data: {
            phone: this.phone,
            type: 'forget'
          },
          method: 'POST',
          dataType: 'json',
          success: (res) => {
            if (res.data.code != 200) {
              uni.showToast({
                title: res.data.msg,
                icon: 'none'
              });
              _this.second = 0;
            } else {
              uni.showToast({
                title: res.data.msg
              });
              _this.second = 60;
              js = setInterval(function() {
                _this.second--;
                if (_this.second == 0) {
                  _this.clear()
                }
              }, 1000)
            }
          },fail() {
            this.clear()
          }
        });
      },
      bindLogin() {
        if (this.phone.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        if (this.password.length < 6) {
          uni.showToast({
            icon: 'none',
            title: '密码不正确'
          });
          return;
        }
        if (this.code.length != 4) {
          uni.showToast({
            icon: 'none',
            title: '验证码不正确'
          });
          return;
        }
        uni.request({
          url: 'http://***/forget.html',
          data: {
            phone: this.phone,
            password: this.password,
            code: this.code
          },
          method: 'POST',
          dataType: 'json',
          success: (res) => {
            if (res.data.code != 200) {
              uni.showToast({
                title: res.data.msg,
                icon: 'none'
              });
            } else {
              uni.showToast({
                title: res.data.msg
              });
              setTimeout(function() {
                uni.navigateBack();
              }, 1500)
            }
          }
        });

      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tishi {
    color: #51565D;
    font-size: 32rpx;
    line-height: 50rpx;
	margin: auto;
    margin-bottom: 50rpx;
	
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50rpx;
    padding-left: 70rpx;
    padding-right: 70rpx;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    color: #666;
  	background: #F4F4F4;
  	border-radius: 39rpx;
  	font-size: 26rpx;
  	margin-top: 20rpx;
  }

  .list-call .img {
    width: 40rpx;
    height: 40rpx;
	margin-right: 20rpx;
  }

  .list-call .sl-input {
    flex: 1;
    text-align: left;
    font-size: 32rpx;
    margin-left: 16rpx;
  }

  .button-login {
  	width: 680rpx;
  	height: 76rpx;
  	background: #1890FF;
  	border-radius: 39rpx;
  	/* opacity: 0.4; */
  	text-align: center;
  	color: #fff;
  	line-height: 70rpx;
  	margin: auto;
  	margin-top: 100rpx;
  }

  .yzm {
    color: #1890FF;
    font-size: 26rpx;
    line-height: 64rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
    width: auto;
    height: 64rpx;
    /* border: 1rpx solid #FFA800; */
    border-radius: 50rpx;
  }
  
  .yzms {
    color: #1890FF !important;
    /* border: 1rpx solid #999999; */
  }
  .agreement{
  	  display: flex;
  	  margin-left: 75rpx;
  	  color: #666666;
  	  font-size: 22rpx;
  	  line-height: 30rpx;
  	  margin-top: 18rpx;
  	  box-sizing: border-box;
  }
</style>
