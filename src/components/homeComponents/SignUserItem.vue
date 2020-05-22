<template>
	<div class="signList">
		<div v-for="(model,i) in Items" :key="i" class="signItem p-4 flex ai-c">
			<div class="signAvatar">
				<img src='../../assets/imgs/defultAvatar.png' alt="">
			</div>
			<div class="userInfo ml-3 flex-1">
				<div class="username">{{model.username}}</div>
				<div class="signDate text-publishText">{{model.date}}</div>
			</div>
			<div v-if="1" class="totalInfo">
				<div class="points bg-points text-blackOpacity"><i class="iconfont icon-jifen"></i>{{model.money}}</div>
				<div class="signTotal"></div>
			</div>
			<div v-else>
				<span class="text-blackOpacity">连续57天</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "SignUserItem",
		data() {
      return {
        Items:[
          {
						avatar:'../assets/imgs/defultAvatar.png',
						username:'USER1',
						date:'2020',
						money:8
					},
          {
						avatar:'../assets/imgs/defultAvatar.png',
						username:'USER2',
						date:'2020',
						money:8
					},
          {
						avatar:'../assets/imgs/defultAvatar.png',
						username:'USER3',
						date:'2020',
						money:8
					},
          {
						avatar:'../assets/imgs/defultAvatar.png',
						username:'USER4',
						date:'2020',
						money:8
					},
				]
			}
    }
  }
</script>

<style scoped lang="scss">
	.signList{
		.signItem{
			border-bottom: 0.083rem solid #f6f7f8;
			.signAvatar{
				width: 2.833rem;
				height: 2.833rem;
				img{
					height: 100%;
					width: 100%;
					border-radius: 0.333rem;
				}
			}
			.userInfo{
				.signDate{
				
				}
			}
			.totalInfo{
				.points{
					width: 3.6rem;
					height: 2.083rem;
					border-radius: 2.5rem;
					font-size: 1rem;
					line-height: 2.083rem;
					text-align: center;
					text-shadow: 0 0.083rem 0 #fff;
				}
			}
		}
	}

</style>
