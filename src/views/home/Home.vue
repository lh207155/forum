<template>
	<div>
			<AdsDisplay></AdsDisplay>
			<HomeContent></HomeContent>
	</div>
</template>

<script>
  import HomeContent from "../../components/homeComponents/HomeContent";
  import AdsDisplay from "../../components/homeComponents/AdsDisplay";
  export default {
    name: "home",
    components: {AdsDisplay, HomeContent},
  }
</script>

<style lang="scss">

</style>
