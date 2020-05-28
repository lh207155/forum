<template>
	<div class="sideToolBar bg-white flex fd-c">
		<router-link to="/profile" class="barItem toProfile borderBottom"><i class="iconfont icon-profile"></i></router-link>
		<div class="barItem QRCode borderBottom"><i class="iconfont icon-qrcode"></i></div>
		<div class="barItem toTop" @click="toTop"><i class="iconfont icon-totop"></i></div>
	</div>
</template>

<script>
  export default {
    name: "SideToolBar",
		methods:{
  
		}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.sideToolBar{
		position: fixed;
		right: 0;
		top:41.667rem;
		.barItem{
			cursor: pointer;
			width: 3.083rem;
			height: 3.75rem;
			text-align: center;
			line-height: 3.75rem;
			&:hover{
				background-color: map_get($colors,'pink');
				i{
					color: white;
				}
			}
			i{
				font-weight: bold;
			}
			&.QRCode{
				position: relative;
				&:hover::after{
					content: '还木有二维码';
					position: absolute;
					border-radius: 0.5rem;
					width: 10.417rem;
					height: 12rem;
					background-color: white;
					top:0;
					left:-12rem
				}
			}
			
		}
	}

</style>
