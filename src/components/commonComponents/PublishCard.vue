<template>
	<div class="p-4 flex borderBottom card bg-white publishCard mt-3">
		<div class="avatar mr-4">
			<img src="../../assets/imgs/defultAvatar.png" alt="">
		</div>
		<div class="comment flex fd-c">
			<textarea class="textArea p-3" v-model="model.comment"></textarea>
			<div class="commentFuntion mt-3 flex">
				<div class="emoji flex-1"></div>
				<button class="btn px-3 bg-blue text-white">提交</button>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
  export default {
    name: "PublishCard",
		data(){
      return {
        model:{
          comment:''
				}
			}
		}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.publishCard{
		width: 100%;
		box-sizing: border-box;
		.avatar{
			width: 4rem;
			img{
				height: 4rem;
			}
		}
		.comment{
			width: 100%;
			.textArea{
				border: 1px solid map-get($colors,'grey2');
				width: 100%;
				height: 8rem;
				resize: none;
				outline: none;
				box-sizing: border-box;
				font-family: "pingfang 准";
			}
		}
	}
	
</style>
