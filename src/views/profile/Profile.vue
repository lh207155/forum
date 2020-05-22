<template>
	<div class="wrapper">
		<Avatar></Avatar>
		<div class="flex mt-3">
			<LeftSideMenu></LeftSideMenu>
			<router-view class="ml-3 flex-1 bg-white"></router-view>
		</div>
	</div>
</template>

<script>
	import Avatar from '../../components/profileComponents/Avatar'
	import LeftSideMenu from '../../components/profileComponents/LeftSideMenu'
  export default {
    name: "Profile",
		components:{
      Avatar,LeftSideMenu
		},

  }
</script>

<style scoped lang="scss">
	.wrapper{
		box-sizing: border-box;
		width: 91.667rem;
		margin: 0 auto;
	}

</style>
