<template>
	<div class="contentBack bg-grey">
		<TheHeader class="header-fixed" :class="{hiddenBanner:hiddenBanner}"></TheHeader>
		<router-view class="forFooterPadding"></router-view>
		<TheFooter></TheFooter>
		<TheRegisterLoginCard></TheRegisterLoginCard>
	</div>
</template>

<script>
	import TheHeader from '../components/globalComponents/TheHeader'
	import TheFooter from '../components/globalComponents/TheFooter'
	import TheRegisterLoginCard from '../components/globalComponents/TheRegisterLoginCard'
  export default {
    name: "Main",
    components:{
      TheHeader,TheFooter,TheRegisterLoginCard
    },
		data(){
      return {
        pageY:0,
        hiddenBanner:false
			}
		},
		methods:{
      scrollCallBack(){
        this.pageY = window.pageYOffset
			},
			addListener(){
        document.addEventListener('scroll',this.scrollCallBack,true)
			}
		},
		created() {
      this.addListener()
    },
		watch:{
      pageY:function () {
        this.hiddenBanner= this.pageY>38?true:false
      }
		}
  }
</script>

<style lang="scss">
	.contentBack{
		background-image: url("../assets/imgs/site-bg.png");
		position: relative;
		min-height: 100vh;
		.header-fixed{
			position: sticky;
			top:0;
			z-index: 10;
			transition: all .3s;
			&.hiddenBanner{
				transform: translate(0,-38px);
			}
		}
		.forFooterPadding{
			padding-bottom: 6rem;
		}
	}
</style>
