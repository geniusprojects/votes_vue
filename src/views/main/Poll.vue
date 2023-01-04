<template>
    <!-- Breadcrumb -->
	<div class="container">
		<div class="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
			<div class="f2-s-1 p-r-30 m-tb-6">
				<a href="/" class="breadcrumb-item f1-s-3 cl9">
					Home
				</a>

				<span class="breadcrumb-item f1-s-3 cl9">
					 {{ poll.title }}
				</span>
			</div>

			<div class="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6">
				<input class="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search">
				<button class="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
					<i class="zmdi zmdi-search"></i>
				</button>
			</div>
		</div>
	</div>

	<!-- Content -->
	<section class="bg0 p-b-70 p-t-5">
		<!-- Title -->
		<div class="bg-img1 size-a-18 how-overlay1" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
			<div class="container h-full flex-col-e-c p-b-58">
				<a href="#" class="f1-s-10 cl0 hov-cl10 trans-03 text-uppercase txt-center m-b-33">
					Technology
				</a>

				<h3 class="f1-l-5 cl0 p-b-16 txt-center respon2">
					{{ poll.title }}
				</h3>

				<div class="flex-wr-c-s">
					<span class="f1-s-3 cl8 m-rl-7 txt-center">
						<a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
							by John Alvarado
						</a>

						<span class="m-rl-3">|</span>

						<span>
							{{ formatDate(poll.created) }}
						</span>
					</span>

					<span class="f1-s-3 cl8 m-rl-7 txt-center">
						{{ poll.votes_count }} Votes
					</span>

					<a href="" class="f1-s-3 cl8 m-rl-7 txt-center hov-cl10 trans-03">
						0 Comment
					</a>
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
							{{ poll.description }}
						</div>

            <div class="progress">
              <div class="progress-bar" v-for="choice in choices" role="progressbar" v-bind:style="'width:' +choice.progress+'%; background-color: '+choice.color" v-bind:aria-valuenow="choice.progress" aria-valuemin="0" aria-valuemax="100">{{ choice.choice_text }}</div>
            </div>

						<!-- Leave a comment -->
						<div v-if="$store.state.isAuthenticated">
							<h4 class="f1-l-4 cl3 p-b-12">
								Choose an Option
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
								<textarea class="comment bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="comment" v-model="comment" placeholder="Comment..." style="display: none;"></textarea>

								<button class="submit size-a-17 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-10" style="display: none;">
									Vote
								</button>
							</form>
						</div>
            <div v-else>
              <p class="f1-s-13 cl8 p-b-40">
                You must be <router-link :to="{ name: 'LogIn',}">logged</router-link> in to be able to vote.
							</p>
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
            },
          },
        },
        methods: {
            formatDate(dateString) {
                const date = new Date(dateString);
                    // Then specify how you want your dates to be formatted
                return Moment(date).format("MMM DD, YYYY");
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
                        this.poll = response.data
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
                        for(let i=0;i<response.data.length;i++){
                          this.votes_count += response.data[i].votes;
                        }
                        for(let i=0;i<response.data.length;i++){
                          response.data[i]['progress'] = response.data[i].votes / this.votes_count * 100;
                        }
                        this.choices = response.data;
                        console.log(this.choices)
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
            async postVote() {
                this.$store.commit('setIsLoading', true)
                const choice = this.choiceSelected.uid;
                this.choiceSelected['comment'] = this.comment;
                await axios
                    .post(`/api/v1/votes/`, this.choiceSelected)
                    .then(response => {
                        $('.comment').fadeOut();
                        $('.submit').fadeOut();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>