<template>
	<div class="signInfoCard card flex fd-c bg-white">
		<div class="title py-4">
			<i class="iconfont icon-gift mr-3"></i><span>点击领取今天的签到奖励!</span>
		</div>
		<div class="signBtnBg py-3 bg-pink flex jc-sa mx-3">
			<button class="signToday text-white">今日签到</button>
			<button class="signContinuously text-white">连续签到</button>
		</div>
		<div>
			<SignUserItem></SignUserItem>
		</div>
		<div class="signRank text-blackOpacity">
			<span>签到排行</span>
		</div>
	</div>
</template>

<script>
  import SignUserItem from "./SignUserItem";
  export default {
    name: "SignInCard",
    components: {SignUserItem}
  }
</script>

<style scoped lang="scss">
	.signInfoCard{
		.title{
			text-align: center;
			i{
				color:red;
			}
			span{
				color:rgba(0,0,0,.8);
				font-size: 1.083rem;
			}
		}
		.signBtnBg{
			background-image: url("../../assets/imgs/site-bg.png");
			border-radius: 0.333rem;
			overflow: hidden;
			.signToday{
				cursor: pointer;
				border: 0;
				outline: none;
				width: 7.667rem;
				height: 2.333rem;
				border-radius: 3.583rem;
				background-color: rgba(255,255,255,.4);
			}
			.signContinuously{
				cursor: pointer;
				border: 0;
				outline: none;
				width: 7.667rem;
				height: 2.333rem;
				background-color: rgba(255,255,255,0);
			}
		}
		.signRank{
			text-align: center;
			font-weight: bold;
			width: 100%;
			height: 3.083rem;
			line-height: 3.083rem;
			background-image: url("../../assets/imgs/geopattern.png");
		}
	}
</style>
