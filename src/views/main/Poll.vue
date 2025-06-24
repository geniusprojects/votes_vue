<template>
    <!-- Breadcrumb -->
	<div class="container">
		<div class="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
			<div class="f2-s-1 p-r-30 m-tb-6">

        <router-link :class="'breadcrumb-item f1-s-3 cl9'" :to="{ name: 'mHomeView'}" style="padding: 3px;"><i class="fa fa-home"></i></router-link>

				<router-link :class="'breadcrumb-item f1-s-3 cl9'" :to="{ name: 'Category', params: { id: poll.category.id }}">
            {{ poll.category.title }}
        </router-link>
        <span class="breadcrumb-item f1-s-3 cl9">
					 {{ poll.title }}
				</span>
			</div>
		</div>
	</div>

	<!-- Content -->
	<section class="bg0 p-b-70 p-t-5">
		<!-- Title -->
		<div class="bg-img1 size-a-18 how-overlay1" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
			<div class="container h-full flex-col-e-c p-b-58">
        <router-link :class="'f1-s-10 cl0 hov-cl10 trans-03 text-uppercase txt-center m-b-33'" :to="{ name: 'Category', params: { id: poll.category.id }}">
            {{ poll.category.title }}
        </router-link>

				<h3 class="f1-l-5 cl0 p-b-16 txt-center respon2">
					{{ poll.title }}
				</h3>

				<div class="flex-wr-c-s">
					<span class="f1-s-3 cl8 m-rl-7 txt-center">
						<a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
							от {{ poll.account.user.username }}
						</a>

						<span class="m-rl-3">|</span>

						<span>
							{{ formatDate(poll.created) }}
						</span>
					</span>

					<span class="f1-s-3 cl8 m-rl-7 txt-center">
						Голосов: {{ poll.votes_count }}
					</span>

<!--					<a href="" class="f1-s-3 cl8 m-rl-7 txt-center hov-cl10 trans-03">-->
<!--						{{ poll.votes_count }} Comment-->
<!--					</a>-->
				</div>
			</div>
		</div>

		<!-- Detail -->
		<div class="container p-t-82">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8 p-b-100">
					<div class="p-r-10 p-r-0-sr991">
						<!-- Blog Detail -->
						<div class="p-b-70">
              <span v-html="poll.description"></span>
						</div>

            <div class="progress" v-if="votes_count && my_vote">
              <div class="progress-bar" v-for="choice in choices" role="progressbar" v-bind:style="'width:' +choice.progress+'%; background-color: '+choice.color" v-bind:aria-valuenow="choice.progress" aria-valuemin="0" aria-valuemax="100">{{ choice.choice_text }}</div>
            </div>
						<!-- Leave a comment -->
						<div class="choices" v-if="$store.state.isAuthenticated && !my_vote && $store.state.user.is_verify">
							<h4 class="f1-l-4 cl3 p-b-12">
								Выбери вариант
							</h4>

							<!--<p class="f1-s-13 cl8 p-b-40">
								Your email address will not be published. Required fields are marked *
							</p>-->

              <div class="form-check" v-for="choice in choices">
                <input class="form-check-input" type="radio"
                       name="choiceSelect"
                       v-bind:value="{ 'id': choice.id, 'uid': choice.uid }"
                       v-bind:id="choice.uid"
                       v-model="choiceSelected"
                       @click="showComment()"
                >

                <label class="form-check-label" v-bind:for="choice.uid" v-bind:style="'border-color:' +choice.color">{{ choice.choice_text }}</label>
              </div>


							<form @submit.prevent="postVote">
								<textarea class="comment bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="comment" v-model="comment" placeholder="Комментарий..." style="display: none;"></textarea>

								<button class="submit size-a-17 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-10" style="display: none;">
									Отправить
								</button>
							</form>
						</div>
            <div v-else-if="$store.state.isAuthenticated && my_vote">
              <p class="f1-s-13 cl8 p-b-40">
                От тебя уже есть голос. Твой выбор: "<span v-bind:style="'color:' +my_vote.choice.color">{{ my_vote.choice.choice_text }}</span>"
							</p>
            </div>
            <div v-else>
              <p class="f1-s-13 cl8 p-b-40">
                Чтобы проголосовать, тебе надо пройти <router-link :to="{ name: 'LogIn',}">верификацию</router-link>!
							</p>
            </div>
            <div class="comments" style="margin-top: 30px;" v-if="votes.length > 0">
                <h4 class="f1-l-4 cl3 p-b-12">
                  Комментарии
                </h4>
                <div class="row">
                    <div class="col-md-12" v-for="vote in votes">
                        <div class="media g-mb-30 media-comment" v-if="vote.comment">
                            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30" v-bind:style="'box-shadow: 0 15px 10px -6px ' + vote.choice.color">
                              <div class="g-mb-15">
                                <h5 class="h5 g-color-gray-dark-v1 mb-0">{{ vote.account.first_name }} {{ vote.account.last_name }}</h5>
                                <span class="g-color-gray-dark-v4 g-font-size-12">{{ formatDateDelta(vote.updated) }}</span>
                              </div>

                              <p>{{ vote.comment }}</p>

                              <ul class="list-inline d-sm-flex my-0" style="justify-content: flex-end;">
                                <li class="list-inline-item">
                                  <button class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" @click="postLike(vote.uid)">
                                    <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                    {{ vote.get_total_likes }}
                                  </button>
                                </li>
                                <li class="list-inline-item">
                                  <button class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" @click="postDisLike(vote.uid)">
                                    <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                    {{ vote.get_total_dis_likes }}
                                  </button>
                                </li>
                              </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
					</div>
				</div>

				<div class="col-md-10 col-lg-4 p-b-100">
					<div class="p-l-10 p-rl-0-sr991">
						<!-- Banner -->
						<div class="flex-c-s">
							<a href="#">
								<img class="max-w-full" src="images/banner-02.jpg" alt="IMG">
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style>
  .progress{
    margin-bottom: 30px;
  }
  .progress-bar{
    height: 25px;
    line-height: 25px;
  }
  .form-check{
    border: 1px #9e9e9e solid;
    border-radius: 10px;
  }
  .form-check:hover{
    border-color: #6c757d;
  }
  .form-check:active{
    border-color: #333333;
  }
  .form-check-input{
    display: none;
  }
  .form-check-label{
    border-radius: 10px;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .form-check-input:checked + label{
    background-color: rgba(5, 62, 0, 0.05);
  }

  @media (min-width: 0) {
      .g-mr-15 {
          margin-right: 1.07143rem !important;
      }
  }
  @media (min-width: 0){
      .g-mt-3 {
          margin-top: 0.21429rem !important;
      }
  }

  .g-height-50 {
      height: 50px;
  }

  .g-width-50 {
      width: 50px !important;
  }

  @media (min-width: 0){
      .g-pa-30 {
          padding: 2.14286rem !important;
      }
  }

  .g-bg-secondary {
      background-color: #fafafa !important;
  }

  .g-color-gray-dark-v4 {
      color: #777 !important;
  }

  .g-font-size-12 {
      font-size: 0.85714rem !important;
  }

  .media-comment {
      margin-top:20px
  }
  .justify-content-center img{max-width: 720px;}
</style>

<script>
    import axios from 'axios'
    import Moment from 'moment'
    export default {
        name: 'Poll',
        data() {
            return {
                poll: {},
                choices: [],
                query: '',
                choiceSelected: '',
                comment: '',
                votes: [],
                my_vote: {'choice': ''},
                votes_count: 0,
            }
        },
        // mounted() {
        //     this.getPoll()
        // },
        watch: {
          '$route.params.id': {
            immediate: true,
            handler() {
              this.getPoll();
              this.getChoices();
              this.getVotes();
              this.getMyVote();
            },
          },
        },
        methods: {
            formatDate(dateString) {
                const date = new Date(dateString);
                    // Then specify how you want your dates to be formatted
                return Moment(date).format("MMM DD, YYYY");
            },
            formatDateDelta(dateString) {
                const date = Moment(new Date(dateString));//.format("MMM DD, YYYY");
                const date_now = Moment(new Date());//.format("MMM DD, YYYY");
                const minutes = date_now.diff(date, 'minutes');

                var text = '';
                if(minutes < 60){
                  text = minutes + ' minutes ago';
                }
                else{
                  const hours = date_now.diff(date, 'hours');
                  if(hours < 24){
                    text = hours + ' hours ago';
                  }
                  else{
                    const days = date_now.diff(date, 'days');
                    if(days < 7){
                      text = days + ' days ago';
                    }
                    else{
                      const weeks = date_now.diff(date, 'weeks');
                      if(weeks < 4){
                        text = weeks + ' weeks ago';
                      }
                      else{
                        const months = date_now.diff(date, 'months');
                        if(months < 12){
                          text = months + ' months ago';
                        }
                        else{
                          const years = date_now.diff(date, 'years');
                          if(years > 0){
                            text = years + ' years ago';
                          }
                        }
                      }
                    }
                  }
                }
                return text;
            },
            showComment(){
              $('.comment').fadeIn();
              $('.submit').fadeIn();
            },
            async getPoll() {
                this.$store.commit('setIsLoading', true)
                const pollUID = this.$route.params.id
                await axios
                    .get(`/api/v1/polls/${pollUID}/`)
                    .then(response => {
                        this.poll = response.data;
                        document.title = this.poll.title + ' | OprosNaRu'
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getChoices() {
                this.$store.commit('setIsLoading', true)
                const pollUID = this.$route.params.id
                await axios
                    .get(`/api/v1/polls/${pollUID}/choices/`)
                    .then(response => {
                        this.votes_count = 0;
                        for(let i=0;i<response.data.length;i++){
                          this.votes_count += response.data[i].votes;
                        }
                        for(let i=0;i<response.data.length;i++){
                          response.data[i]['progress'] = response.data[i].votes / this.votes_count * 100;
                        }
                        this.choices = response.data;
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getVotes() {
                this.$store.commit('setIsLoading', true)
                const pollUID = this.$route.params.id
                await axios
                    .get(`/api/v1/polls/${pollUID}/votes/`)
                    .then(response => {
                        this.votes = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getMyVote() {
                this.$store.commit('setIsLoading', true)
                const pollUID = this.$route.params.id
                await axios
                    .get(`/api/v1/polls/${pollUID}/my-vote/`)
                    .then(response => {
                        if(response.data.comment){
                          this.my_vote = response.data
                        }
                        if(response.data.choice){
                          this.my_vote = response.data
                          $('.choices').fadeOut();
                        }
                        else{
                          this.my_vote = null
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async postVote() {
                this.$store.commit('setIsLoading', true)
                const choice = this.choiceSelected.uid;
                this.choiceSelected['comment'] = this.comment;
                await axios
                    .post(`/api/v1/votes/`, this.choiceSelected)
                    .then(response => {
                        $('.comment').fadeOut();
                        $('.submit').fadeOut();
                        $('.choices').fadeOut();
                        this.getChoices();
                        this.getVotes();
                        this.getMyVote();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async postLike(comment_uid) {
                this.$store.commit('setIsLoading', true)
                const data = {
                    uid: comment_uid
                }
                await axios
                    .post(`/api/v1/likes/`, data)
                    .then(response => {
                        this.getVotes();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async postDisLike(comment_uid) {
                this.$store.commit('setIsLoading', true)
                const data = {
                    uid: comment_uid
                }
                await axios
                    .post(`/api/v1/dislikes/`, data)
                    .then(response => {
                        this.getVotes();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>