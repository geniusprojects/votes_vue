<template>
    <div class="container">
		<div class="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
			<div class="f2-s-1 p-r-30 m-tb-6">
				<router-link :class="'breadcrumb-item f1-s-3 cl9'" :to="{ name: 'mHomeView'}" style="padding: 3px;"><i class="fa fa-home"></i></router-link>

				<span class="breadcrumb-item f1-s-3 cl9">
					{{ group.title }}
				</span>
			</div>
		</div>
	</div>

	<!-- Page heading -->
	<div class="container p-t-4 p-b-40">
		<h2 class="f1-l-1 cl2">
			{{ group.title }}
		</h2>
	</div>

	<!-- Feature post -->
	<section class="bg0">
		<div class="container">
			<div class="row m-rl--1">
				<div class="col-md-6 p-rl-1 p-b-2" v-for="poll in popular_polls.slice(0, 1)">
					<div class="bg-img1 size-a-3 how1 pos-relative" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
						<router-link :class="'dis-block how1-child1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}"></router-link>

						<div class="flex-col-e-s s-full p-rl-25 p-tb-20">
              <router-link :class="'dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2'" :to="{ name: 'Category', params: { id: poll.category.id }}">
                  {{ poll.category.title }}
              </router-link>

							<h3 class="how1-child2 m-t-14 m-b-10">
                <router-link :class="'how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                    {{ poll.title }}
                </router-link>
							</h3>

							<span class="how1-child2">
                <span class="f1-s-4 cl11">
                  {{ poll.votes_count }} votes
                </span>

                <span class="f1-s-3 cl11 m-rl-3">
                  |
                </span>

                <span class="f1-s-3 cl11">
                  {{ formatDate(poll.created) }}
                </span>
              </span>
						</div>
					</div>
				</div>

				<div class="col-md-6 p-rl-1">
					<div class="row m-rl--1">
						<div class="col-sm-6 p-rl-1 p-b-2" v-for="poll in popular_polls.slice(1, 5)">
							<div class="bg-img1 size-a-14 how1 pos-relative" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
								<router-link :class="'dis-block how1-child1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}"></router-link>

								<div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                  <router-link :class="'dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2'" :to="{ name: 'Category', params: { id: poll.category.id }}">
                      {{ poll.category.title }}
                  </router-link>

									<h3 class="how1-child2 m-t-14">
                    <router-link :class="'how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                        {{ poll.title }}
                    </router-link>
									</h3>
                  <span class="how1-child2">
                    <span class="f1-s-4 cl11">
                      {{ poll.votes_count }} votes
                    </span>

                    <span class="f1-s-3 cl11 m-rl-3">
                      |
                    </span>

                    <span class="f1-s-3 cl11">
                      {{ formatDate(poll.created) }}
                    </span>
                  </span>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Post -->
	<section id="polls" class="bg0 p-t-70 p-b-55">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8 p-b-80">
					<div class="row">

						<div class="col-sm-6 p-r-25 p-r-15-sr991" v-for="poll in polls">
							<!-- Item latest -->
							<div class="m-b-45">
                <router-link :class="'wrap-pic-w hov1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                    <img v-bind:src="poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png'" alt="IMG">
                </router-link>

								<div class="p-t-16">
									<h5 class="p-b-5">
                    <router-link :class="'f1-m-3 cl2 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                        {{ poll.title }}
                    </router-link>
									</h5>

									<span class="cl8">
                    <router-link :class="'f1-s-4 cl8 hov-cl10 trans-03'" :to="{ name: 'Category', params: { id: poll.category.id }}">
                        {{ poll.category.title }}
                    </router-link>

										<span class="f1-s-3 m-rl-3">
											|
										</span>

										<span class="f1-s-3">
											{{ formatDate(poll.created) }}
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Pagination -->
					<div class="flex-wr-s-c m-rl--7 p-t-15">
            <button class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
            <button class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5" @click="goToNextPage()" v-if="showNextButton">Next</button>
					</div>
				</div>

				<div class="col-md-10 col-lg-4 p-b-80">
					<div class="p-l-10 p-rl-0-sr991">
						<!-- Subscribe -->
						<div class="bg10 p-rl-35 p-t-28 p-b-35 m-b-50">
							<h5 class="f1-m-5 cl0 p-b-10">
								Subscribe
							</h5>

							<p class="f1-s-1 cl0 p-b-25">
								Get all latest content delivered to your email a few times a month.
							</p>

							<form class="size-a-9 pos-relative">
								<input class="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" type="text" name="email" placeholder="Email">

								<button class="size-a-10 flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03">
									<i class="fa fa-arrow-right"></i>
								</button>
							</form>
						</div>

						<!-- Most Popular -->
						<div class="p-b-23">
							<div class="how2 how2-cl4 flex-s-c">
								<h3 class="f1-m-2 cl3 tab01-title">
									Популярное
								</h3>
							</div>

							<ul class="p-t-35">
								<li class="flex-wr-sb-s p-b-22">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
										1
									</div>

									<a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit
									</a>
								</li>

								<li class="flex-wr-sb-s p-b-22">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
										2
									</div>

									<a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
										Proin velit consectetur non neque
									</a>
								</li>

								<li class="flex-wr-sb-s p-b-22">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
										3
									</div>

									<a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
										Nunc vestibulum, enim vitae condimentum volutpat lobortis ante
									</a>
								</li>

								<li class="flex-wr-sb-s p-b-22">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
										4
									</div>

									<a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
										Proin velit justo consectetur non neque elementum
									</a>
								</li>

								<li class="flex-wr-sb-s p-b-22">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0">
										5
									</div>

									<a href="#" class="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
										Proin velit consectetur non neque
									</a>
								</li>
							</ul>
						</div>

						<!--  -->
						<div class="flex-c-s p-b-50">
							<a href="#">
								<img class="max-w-full" src="images/banner-02.jpg" alt="IMG">
							</a>
						</div>

						<!-- Tag -->
						<div>
							<div class="how2 how2-cl4 flex-s-c m-b-30">
								<h3 class="f1-m-2 cl3 tab01-title">
									Tags
								</h3>
							</div>

							<div class="flex-wr-s-s m-rl--5">
								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Fashion
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Lifestyle
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Denim
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Streetstyle
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Crafts
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Magazine
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									News
								</a>

								<a href="#" class="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
									Blogs
								</a>
							</div>
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
        name: 'Group',
        data() {
            return {
                group: {},
                polls: [],
                popular_polls: [],
                showNextButton: false,
                showPreviousButton: false,
                currentPage: 1,
                query: '',
                num_polls: 0
            }
        },
        mounted() {
            this.getGroup(),
            this.getPolls(),
            this.getPopularPolls()
        },
        watch: {
          '$route.params.id': {
            immediate: true,
            handler(newId) {
              this.getGroup(newId);
              this.getPolls(newId);
              this.getPopularPolls(newId);
            }
          }
        },
        methods: {
            formatDate(dateString) {
                const date = new Date(dateString);
                    // Then specify how you want your dates to be formatted
                return Moment(date).format("MMM DD, YYYY");
            },
            goToNextPage() {
                this.currentPage += 1
                this.getPolls()
                var getPolls = document.getElementById("polls");
                getPolls.scrollIntoView({behavior: 'smooth'}, true);
            },
            goToPreviousPage() {
                this.currentPage -= 1
                this.getPolls()
                var getPolls = document.getElementById("polls");
                getPolls.scrollIntoView({behavior: 'smooth'}, true);
            },
            async getGroup() {
                this.$store.commit('setIsLoading', true)
                const groupID = this.$route.params.id
                await axios
                    .get(`/api/v1/groups/${groupID}/`)
                    .then(response => {
                        this.group = response.data;
                        document.title = this.group.title
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getPolls() {
                this.$store.commit('setIsLoading', true)
                this.showNextButton = false
                this.showPreviousButton = false
                const groupID = this.$route.params.id
                await axios
                    .get(`/api/v1/groups/${groupID}/polls/`)
                    .then(response => {
                        this.num_polls = response.data.count
                    })
                await axios
                    .get(`/api/v1/groups/${groupID}/polls/?page=${this.currentPage}&search=${this.query}`)
                    .then(response => {
                        this.polls = response.data.results
                        if (response.data.next) {
                            this.showNextButton = true
                        }
                        if (response.data.previous) {
                            this.showPreviousButton = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getPopularPolls() {
                this.$store.commit('setIsLoading', true)
                const groupID = this.$route.params.id
                await axios
                    .get(`/api/v1/groups/${groupID}/polls/popular/`)
                    .then(response => {
                        this.popular_polls = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>