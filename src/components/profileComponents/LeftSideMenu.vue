<template>
	<div class="menu text-blue">
		<router-link tag="div" to="/profile/overview" class="menu-item py-3 px-5 flex borderBottom" :class="{active:profileCardIndex===1}">
			<i class="iconfont icon-profile mr-3"></i>
			<span class="flex-1">概览</span>
			<i class="iconfont icon-arrowRight"></i>
		</router-link>
		<router-link tag="div" to="/profile/published" class="menu-item py-3 px-5 flex borderBottom" :class="{active:profileCardIndex===2}">
			<i class="iconfont icon-write mr-3"></i>
			<span class="flex-1">发布</span>
			<i class="iconfont icon-arrowRight"></i>
		</router-link>
		<router-link tag="div" to="/profile/collection" class="menu-item py-3 px-5 flex borderBottom" :class="{active:profileCardIndex===3}">
			<i class="iconfont icon-collection mr-3"></i>
			<span class="flex-1">收藏</span>
			<i class="iconfont icon-arrowRight"></i>
		</router-link>
	</div>
</template>

<script>
  export default {
    name: "LeftSideMenu",
		computed:{
      profileCardIndex(){
        return this.$store.state.profileCardIndex
			}
		}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.menu{
		width: 25rem;
		.menu-item{
			cursor: pointer;
			height: 4.5rem;
			box-sizing: border-box;
			line-height: 2.417rem;
			background-color: white;
			&.active{
				background-color: map-get($colors,'arrow');
			}
		}
	}

</style>
