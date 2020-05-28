<template>
	<div class="calenderCard card">
		<div class="total borderBottom p-2 flex jc-sb px-4">
			<span class="flex-1 text-l">{{$store.getters.signed?`您已连续签到${$store.state.user.signs}天`:''}}</span>
			<span class="flex-1 text-r">{{`${curTotalDays||0}/${lastDay}`}}</span></div>
		<div class="body mt-2">
			<ul class="week flex">
				<li>日</li><li>一</li>
				<li>二</li>
				<li>三</li>
				<li>四</li>
				<li>五</li>
				<li>六</li>
			</ul>
			<ul class="day mt-3 flex flex-w">
				<li v-for="(d,i) in days" :key="i" class="mt-4" :class="{active:d.active,today:d.today}">{{d.day}}</li>
			</ul>
		</div>
		<div v-if="!$store.getters.signed" class="sign text-c bg-blue text-white mt-4" @click="sign">{{'点击签到'}}</div>
		<div v-else class="sign text-c bg-grey text-blue mt-4">{{'今日已签到'}}</div>
	</div>
</template>

<script>
  export default {
    name: "Calendar",
		data(){
      return {
        days:new Array(42),
				lastDay: '',
				curTotalDays:''
			}
		},
		methods:{
      fetchDays(){
        // 获取当年年份
        const _year = new Date().getFullYear()
				// 获取当月月份
        const _month = new Date().getMonth()
				// 获取当年当月最后一天：下个月减一天得到
				const _lastDay =  new Date(new Date(_year,_month+1,1).getTime()-1000*60*60*24).getDate()
				this.lastDay = _lastDay
        // 获取当月第一天星期几
				const _firstDayWeek =  new Date(_year,_month,1).getDay()
				const today = new Date().getDate()
				// j:日期累加
				for(let i = 0 , j =1 ; i < 42 ; i++){
          // example:本月第一天是周五，那么从数组中第5个开始是1号（第0个是周日），一直累加到第(_lastDay+_firstDayWeek-1)个就是最后一天
          if(i >= _firstDayWeek && i < _lastDay + _firstDayWeek){
            // 初始化他们的状态：
						// date:该位置存在日期
						// active:已签到
						// today:今日未签到状态
						// todayActive:今日已签到状态
						// day：日期
            this.days[i] = {date:true,active:false,today:today===j?true:false,todayActive:false,day:j++}
					}else{
            this.days[i] = {date:null,active:null,today:null,todayActive:null,day:null}
					}
				}
			},
			// 签到
			async sign(){
        // 服务器验证是否今天已经签到
        if(!this.$store.state.user){
          return this.$store.commit('toLogin')
        }else{
          const res = await this.$http.get('/rest/sign/sign')
          console.log(res.data.message)
					await this.fetch()
        }
      },
			// 获取用户当月签到记录
			async fetch(){
        const res = await this.$http.get('/rest/sign/signList')
				if(res.data.model){
          this.curTotalDays = res.data.model.signList.length
          res.data.model.signList.forEach(signDay=>{
            for(let i = 0 ;i<42;i++){
              // 如果签到日等于日历的日期
              if(this.days[i].day === signDay){
                // 设置active
                // 这里vue数组索引赋值不更新视图，所以把索引填在key上，然后assign合并
                this.$set(this.days,i,Object.assign({},this.days[i],{active:true}))
              }
            }
          })
				}
			}
		},
		created() {
      this.fetchDays()
			this.fetch()
    },
		mounted() {
      // 监听其他签到组件的签到事件，再此更新日历表
      this.$root.$on('signed',this.fetch)
    }
  }
</script>

<style lang="scss">
	@import "../../assets/scss/variables";
	.calenderCard{
		border-radius: 0;
		color: map-get($colors,'blackOpacity');
		width: 23rem;
		background-color: rgba(255,255,255,1);
		z-index: 1;
		overflow: hidden;
		line-height: normal;
		.total{
			height: 4rem;
			line-height: 4rem;
		}
		.body{
			width: 17.5rem;
			height: 19.167rem;
			margin: 1rem auto;
			.week{
				list-style: none;
				text-align: center;
				li{
					width: 2.5rem;
					
				}
			}
			.day{
				list-style: none;
				text-align: center;
				li{
					box-sizing: border-box;
					width: 2.5rem;
					position: relative;
					&.active::after{
						content: '';
						position: absolute;
						top: -0.15rem;
						left: 0.4rem;
						width: 1.6rem;
						height: 1.6rem;
						border-radius: 50%;
						border: 1px solid orange;
					}
					&.today::after{
						content: '';
						position: absolute;
						top: -0.15rem;
						left: 0.4rem;
						width: 1.6rem;
						height: 1.6rem;
						border-radius: 50%;
						background-color: map_get($colors,'pink');
						opacity: .3;
					}
				}
			}
		}
		.sign{
			height: 4rem;
			line-height: 4rem;
		}
	}
</style>
