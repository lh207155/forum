<template>
	<swiper class="signList" :options="swiperOptions">
		<swiper-slide class="swiperWrapper">
			<div v-for="(model,i) in Items" :key="i" class="signItem p-4 flex ai-c">
				<div class="signAvatar">
					<img src='../../assets/imgs/defultAvatar.png' alt="">
				</div>
				<div class="userInfo ml-3 flex-1">
					<div class="username">{{model.username}}</div>
					<div class="signDate text-publishText">{{model.date}}</div>
				</div>
				<div class="totalInfo">
					<div class="points bg-points text-blackOpacity"><i class="iconfont icon-jifen"></i>{{model.money}}</div>
					<div class="signTotal"></div>
				</div>
			</div>
		</swiper-slide>
		<swiper-slide class="swiperWrapper">
			<div v-for="(model,i) in Items" :key="i+10" class="signItem p-4 flex ai-c">
				<div class="signAvatar">
					<img src='../../assets/imgs/defultAvatar.png' alt="">
				</div>
				<div class="userInfo ml-3 flex-1">
					<div class="username">{{model.username}}</div>
					<div class="signDate text-publishText">{{model.date}}</div>
				</div>
				<div>
					<span class="text-blackOpacity">连续57天</span>
				</div>
			</div>
		</swiper-slide>
	</swiper>
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
				],
				// swiper组件配置
				swiperOptions:{
          // 事件
          on:{
            // 滑动开始事件
            slideChangeTransitionStart: ()=>{
              // 这里使用了箭头函数，this指向当前的组件实例，如果使用常规函数，指向的是swiper实例，就不方便广播事件了
							// 当前组件广播事件，传一个参数：当前组件的第一个子组件里的swiper实例对象的realIndex属性（也就是当前滑动页面的索引）
              this.$emit('toggle',this.$children[0].$swiper.realIndex)
            },
					}
				}
			}
    },
  }
</script>

<style lang="scss">
	.signList{
		width: 100%;
		.swiperWrapper{
			width: 100%;
		}
		.signItem{
			cursor: pointer;
			border-bottom: 0.083rem solid #f6f7f8;
			box-sizing: border-box;
			width: 100%;
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
