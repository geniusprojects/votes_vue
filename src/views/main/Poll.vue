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

						<!-- Leave a comment -->
						<div>
							<h4 class="f1-l-4 cl3 p-b-12">
								Leave a Comment
							</h4>

							<p class="f1-s-13 cl8 p-b-40">
								Your email address will not be published. Required fields are marked *
							</p>

							<form>
								<textarea class="bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="msg" placeholder="Comment..."></textarea>

								<input class="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="name" placeholder="Name*">

								<input class="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="email" placeholder="Email*">

								<input class="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="website" placeholder="Website">

								<button class="size-a-17 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-10">
									Post Comment
								</button>
							</form>
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

<script>
    import axios from 'axios'
    import Moment from 'moment'
    export default {
        name: 'Poll',
        data() {
            return {
                poll: {},
                query: '',
            }
        },
        // mounted() {
        //     this.getPoll()
        // },
        watch: {
          '$route.params.id': {
            immediate: true,
            handler() {
              this.getPoll()
            },
          },
        },
        methods: {
            formatDate(dateString) {
                const date = new Date(dateString);
                    // Then specify how you want your dates to be formatted
                return Moment(date).format("MMM DD, YYYY");
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
        }
    }
</script>