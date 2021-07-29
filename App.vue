<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	li{
		list-style: none;
	}
	
	view,button,text,image,video,cover-view,cover-image,picker {
		box-sizing: border-box;
	}
</style>
