<template>
	<div class="header flex bg-white p-4">
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
				<b class="mr-4 text-purple2">{{userInfo.username}}</b>
				<span class="title text-white bg-pink px-1">{{`Lv.${userInfo.level}`}}</span>
			</div>
			<div class="intro mt-4">
				<span class="tag bg-border p-1 mr-3 px-2">说说自己</span>
				<span class="introduction text-titleMark">我是小可爱</span>
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
		position: relative;
		width: 100%;
		box-sizing: border-box;
		z-index: 1;
		overflow:hidden;
		border-radius: 0.5rem;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url("../../assets/imgs/profile2.jpg");
			filter: blur(10px);
			z-index: -1;
		}
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
				border-radius: 0.5rem;
			}
		}
		.info{
			.infoItem{
				b{
					font-size: 2rem;
				}
			}
			.intro{
				.tag{
					border-radius: 0.333rem;
				}
				.introduction{
					font-size: 1.2rem;
					/*font-weight: 600;*/
					
				}
			}
			
		}
	}
</style>
