<template>
	<div class="p-4 flex borderBottom card bg-white publishCard mt-3">
		<div class="avatar mr-4">
			<img :src="$store.state.user.avatar" alt="">
		</div>
		<div class="comment flex fd-c" ref="submit">
			<textarea class="textArea p-3" v-model="comment"></textarea>
			<div class="commentFuntion mt-3 flex">
				<div class="emoji flex-1"></div>
				<button class="btn px-3 bg-blue text-white" @click="submit">提交</button>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
  export default {
    name: "PublishCard",
		props:{
      id:String
		},
		data(){
      return {
				comment:''
			}
		},
		methods:{
      async submit(){
        try{
          await this.$http.post('/rest/comment',{
            comment:this.comment,
            articleId:this.id,

          })
          //广播事件，并传入一个当前页面距离底部的距离，在dom更新后保持页面距离底部的距离不变
          const fixedHeight = document.body.clientHeight-window.pageYOffset
          this.$emit('update',fixedHeight)
				}catch (e) {
          console.log(e.response.status)
          e.response.status === 401 ? this.$store.commit('toLogin'):false
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
				width: 4rem;
				border-radius: 0.333rem;
				object-fit: cover;
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
