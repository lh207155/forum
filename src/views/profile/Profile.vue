<template>
	<div class="wrapper">
		<Avatar></Avatar>
		<div class="flex">
<!--			<LeftSideMenu></LeftSideMenu>-->
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Avatar from '../../components/profileComponents/Avatar'
  export default {
    name: "Profile",
		components:{
      Avatar
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
