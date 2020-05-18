<template>
	<div class="header flex bg-white card p-4">
		<div class="avatar">
			<img :src="userInfo.avatar" alt="">
			<label for="file" class="upload flex fd-c jc-c ai-c text-whiteOpacity">
				<i class="iconfont icon-camera1 mb-3"></i>
				<span class="">点击上传头像</span>
				<input type="file" name="file" id="file" style="visibility: hidden;height: 0px" @change="uploadAvatar" ref="file">
			</label>
		</div>
		<div class="info ml-4 flex fd-c jc-e">
			<div class="infoItem">
				<b class="mr-5">lh207155</b>
				<span class="text-summary">1</span>
			</div>
			<div class="intro mt-4">
				<span class="tag bg-border p-1 mr-3">一句话介绍自己</span>
				<span class="introduction text-blackOpacity">我是小可爱</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "Avatar",
		data(){
      return {
        file:''
			}
		},
		computed:{
      userInfo(){
        return this.$store.state.user
			}
		},
		methods:{
      async uploadAvatar(){
				const file = new FormData()
				file.append('file',this.$refs.file.files[0])
				const res = await this.$http.post('/upload',file)
				this.$store.commit('avatarUpload',res.data.url)
			}
		}
  }
</script>

<style scoped lang="scss">
	.header{
		width: 100%;
		box-sizing: border-box;
		.avatar{
			position: relative;
			height: 10rem;
			width: 10rem;
			&:hover .upload{
				visibility: inherit;
			}
			.upload{
				visibility: hidden;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.5);
			}
			img{
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
		.info{
			.infoItem{
				b{
					font-size: 2rem;
				}
			}
			.intro{
				.introduction{
					font-size: 1.5rem;
					font-weight: 600;
				}
			}
			
		}
	}
</style>
