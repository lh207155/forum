<template>
	<div class="contentBack bg-grey">
		<TheHeader></TheHeader>
		<router-view></router-view>
		<TheFooter></TheFooter>
		<TheRegisterLoginCard></TheRegisterLoginCard>
	</div>
</template>

<script>
	import TheHeader from '../components/TheHeader'
	import TheFooter from '../components/TheFooter'
	import TheRegisterLoginCard from '../components/TheRegisterLoginCard'
  export default {
    name: "Main",
    components:{
      TheHeader,TheFooter,TheRegisterLoginCard
    }
  }
</script>

<style>
	.contentBack{
		background-image: url("../assets/imgs/site-bg.png");
		position: relative;
	}
</style>
