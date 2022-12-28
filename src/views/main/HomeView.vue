<template>
  <!-- Headline -->
	<div class="container">
		<div class="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
			<div class="f2-s-1 p-r-30 size-w-0 m-tb-6 flex-wr-s-c">
<!--				<span class="text-uppercase cl2 p-r-8">-->
<!--					Trending Now:-->
<!--				</span>-->

<!--				<span class="dis-inline-block cl6 slide100-txt pos-relative size-w-0" data-in="fadeInDown" data-out="fadeOutDown">-->
<!--					<span class="dis-inline-block slide100-txt-item animated visible-false">-->
<!--						Interest rate angst trips up US equity bull market-->
<!--					</span>-->

<!--					<span class="dis-inline-block slide100-txt-item animated visible-false">-->
<!--						Designer fashion show kicks off Variety Week-->
<!--					</span>-->

<!--					<span class="dis-inline-block slide100-txt-item animated visible-false">-->
<!--						Microsoft quisque at ipsum vel orci eleifend ultrices-->
<!--					</span>-->
<!--				</span>-->
			</div>

			<div class="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6">
				<input class="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search">
				<button class="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
					<i class="zmdi zmdi-search"></i>
				</button>
			</div>
		</div>
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
						<div class="col-12 p-rl-1 p-b-2" v-for="poll in popular_polls.slice(1, 2)">
							<div class="bg-img1 size-a-4 how1 pos-relative" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
                <router-link :class="'dis-block how1-child1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}"></router-link>

								<div class="flex-col-e-s s-full p-rl-25 p-tb-24">
                  <router-link :class="'dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2'" :to="{ name: 'Category', params: { id: poll.category.id }}">
                      {{ poll.category.title }}
                  </router-link>

									<h3 class="how1-child2 m-t-14">
                    <router-link :class="'how-txt1 size-a-7 f1-l-2 cl0 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
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
						<div class="col-sm-6 p-rl-1 p-b-2" v-for="poll in popular_polls.slice(2, 4)">
							<div class="bg-img1 size-a-5 how1 pos-relative" v-bind:style="'background-image: url('+(poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png')+');'">
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
	<section class="bg0 p-t-70">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8">
					<div class="p-b-20">
						<div class="tab01 p-b-20" v-for="(group, parent_index) in groups" v-bind:key="group.id">
							<div class="tab01-head how2 how2-cl2 bocl12 flex-s-c m-r-10 m-r-0-sr991">
								<!-- Brand tab -->
								<h3 class="f1-m-2 cl13 tab01-title">
                  {{ group.title }}
								</h3>

								<!-- Nav tabs -->
								<ul class="nav nav-tabs" role="tablist">

									<li class="nav-item" v-for="(category, index) in group.categories">
										<a class="nav-link" data-toggle="tab" v-bind:href="'#tab'+parent_index+'-'+index" v-bind:class="index == 0 ? 'active' : ''" role="tab">{{ category.title }}</a>
									</li>

									<li class="nav-item-more dropdown dis-none">
										<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
											<i class="fa fa-ellipsis-h"></i>
										</a>

										<ul class="dropdown-menu">

										</ul>
									</li>
								</ul>

								<!--  -->
                <router-link class="tab01-link f1-s-1 cl9 hov-cl10 trans-03" :to="'/groups/' + group.id">
                    View all
                    <i class="fs-12 m-l-5 fa fa-caret-right"></i>
                </router-link>
							</div>


							<!-- Tab panes -->
							<div class="tab-content p-t-35">
								<!-- - -->
								<div class="tab-pane fade" v-for="(category, index) in group.categories" v-bind:id="'tab'+parent_index+'-'+index" v-bind:class="index == 0 ? 'active show' : ''" role="tabpanel">
									<div class="row">

										<div class="col-sm-6 p-r-25 p-r-15-sr991">
											<!-- Item post -->
											<div class="m-b-30" v-for="poll in category.polls.slice(0, 1)">
                        <router-link :class="'wrap-pic-w hov1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                            <img v-bind:src="poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png'" alt="IMG">
                        </router-link>

												<div class="p-t-20">
													<h5 class="p-b-5">
                            <router-link :class="'f1-m-3 cl2 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                                {{ poll.title }}
                            </router-link>
													</h5>

													<span class="cl8">
                            <router-link :class="'f1-s-4 cl8 hov-cl10 trans-03'" :to="{ name: 'Category', params: { id: category.id }}">
                                {{ category.title }}
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

										<div class="col-sm-6 p-r-25 p-r-15-sr991">
											<!-- Item post -->
											<div class="flex-wr-sb-s m-b-30" v-for="poll in category.polls.slice(1, 4)">
                        <router-link :class="'size-w-1 wrap-pic-w hov1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                            <img v-bind:src="poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png'" alt="IMG">
                        </router-link>

												<div class="size-w-2">
													<h5 class="p-b-5">
                            <router-link :class="'f1-s-5 cl3 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                                {{ poll.title }}
                            </router-link>
													</h5>

													<span class="cl8">
                            <router-link :class="'f1-s-6 cl8 hov-cl10 trans-03'" :to="{ name: 'Category', params: { id: category.id }}">
                                {{ category.title }}
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
								</div>

							</div>
						</div>
					</div>
				</div>

				<div class="col-md-10 col-lg-4">
					<div class="p-l-10 p-rl-0-sr991 p-b-20">
						<!--  -->
						<div>
							<div class="how2 how2-cl3 flex-s-c">
								<h3 class="f1-m-2 cl3 tab01-title">
									Most Popular
								</h3>
							</div>

							<ul class="p-t-35">
								<li class="flex-wr-sb-s p-b-22" v-for="(poll, index) in popular_polls">
									<div class="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
										{{ index + 1 }}
									</div>

                  <router-link :class="'size-w-3 f1-s-7 cl3 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                      {{ poll.title }}
                  </router-link>
								</li>

							</ul>
						</div>

						<!--  -->
<!--						<div class="flex-c-s p-t-8">-->
<!--							<a href="#">-->
<!--								<img class="max-w-full" src="images/banner-02.jpg" alt="IMG">-->
<!--							</a>-->
<!--						</div>-->

<!--						&lt;!&ndash;  &ndash;&gt;-->
<!--						<div class="p-t-50">-->
<!--							<div class="how2 how2-cl4 flex-s-c">-->
<!--								<h3 class="f1-m-2 cl3 tab01-title">-->
<!--									Stay Connected-->
<!--								</h3>-->
<!--							</div>-->

<!--							<ul class="p-t-35">-->
<!--								<li class="flex-wr-sb-c p-b-20">-->
<!--									<a href="#" class="size-a-8 flex-c-c borad-3 size-a-8 bg-facebook fs-16 cl0 hov-cl0">-->
<!--										<span class="fab fa-facebook-f"></span>-->
<!--									</a>-->

<!--									<div class="size-w-3 flex-wr-sb-c">-->
<!--										<span class="f1-s-8 cl3 p-r-20">-->
<!--											6879 Fans-->
<!--										</span>-->

<!--										<a href="#" class="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">-->
<!--											Like-->
<!--										</a>-->
<!--									</div>-->
<!--								</li>-->

<!--								<li class="flex-wr-sb-c p-b-20">-->
<!--									<a href="#" class="size-a-8 flex-c-c borad-3 size-a-8 bg-twitter fs-16 cl0 hov-cl0">-->
<!--										<span class="fab fa-twitter"></span>-->
<!--									</a>-->

<!--									<div class="size-w-3 flex-wr-sb-c">-->
<!--										<span class="f1-s-8 cl3 p-r-20">-->
<!--											568 Followers-->
<!--										</span>-->

<!--										<a href="#" class="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">-->
<!--											Follow-->
<!--										</a>-->
<!--									</div>-->
<!--								</li>-->

<!--								<li class="flex-wr-sb-c p-b-20">-->
<!--									<a href="#" class="size-a-8 flex-c-c borad-3 size-a-8 bg-youtube fs-16 cl0 hov-cl0">-->
<!--										<span class="fab fa-youtube"></span>-->
<!--									</a>-->

<!--									<div class="size-w-3 flex-wr-sb-c">-->
<!--										<span class="f1-s-8 cl3 p-r-20">-->
<!--											5039 Subscribers-->
<!--										</span>-->

<!--										<a href="#" class="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">-->
<!--											Subscribe-->
<!--										</a>-->
<!--									</div>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</div>-->
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Banner -->
<!--	<div class="container">-->
<!--		<div class="flex-c-c">-->
<!--			<a href="#">-->
<!--				<img class="max-w-full" src="images/banner-01.jpg" alt="IMG">-->
<!--			</a>-->
<!--		</div>-->
<!--	</div>-->

	<!-- Latest -->
	<section class="bg0 p-t-60 p-b-35">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8 p-b-20">
					<div class="how2 how2-cl5 flex-s-c m-r-10 m-r-0-sr991">
						<h3 class="f1-m-2 cl3 tab01-title">
							Latest Polls
						</h3>
					</div>

					<div class="row p-t-35">

						<div class="col-sm-6 p-r-25 p-r-15-sr991" v-for="poll in latest_polls">
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
				</div>

				<div class="col-md-10 col-lg-4">
<!--					<div class="p-l-10 p-rl-0-sr991 p-b-20">-->
<!--						&lt;!&ndash; Video &ndash;&gt;-->
<!--						<div class="p-b-55">-->
<!--							<div class="how2 how2-cl4 flex-s-c m-b-35">-->
<!--								<h3 class="f1-m-2 cl3 tab01-title">-->
<!--									Featured Video-->
<!--								</h3>-->
<!--							</div>-->

<!--							<div>-->
<!--								<div class="wrap-pic-w pos-relative">-->
<!--									<img src="images/video-01.jpg" alt="IMG">-->

<!--									<button class="s-full ab-t-l flex-c-c fs-32 cl0 hov-cl10 trans-03" data-toggle="modal" data-target="#modal-video-01">-->
<!--										<span class="fab fa-youtube"></span>-->
<!--									</button>-->
<!--								</div>-->

<!--								<div class="p-tb-16 p-rl-25 bg3">-->
<!--									<h5 class="p-b-5">-->
<!--										<a href="#" class="f1-m-3 cl0 hov-cl10 trans-03">-->
<!--											Music lorem ipsum dolor sit amet consectetur-->
<!--										</a>-->
<!--									</h5>-->

<!--									<span class="cl15">-->
<!--										<a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">-->
<!--											by John Alvarado-->
<!--										</a>-->

<!--										<span class="f1-s-3 m-rl-3">-->
<!--											- -->
<!--										</span>-->

<!--										<span class="f1-s-3">-->
<!--											Feb 18-->
<!--										</span>-->
<!--									</span>-->
<!--								</div>-->
<!--							</div>-->
<!--						</div>-->
<!--					</div>-->
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// @ is an alias to /src

import Header from '@/components/layout/header'
import axios from "axios";
import Moment from 'moment'

export default {
  name: 'mHomeView',
  components: {
      Header
  },
  data() {
      return {
          groups: {
              categories: [],
          },
          popular_polls: [],
          latest_polls: []
      }
  },
  mounted() {
      this.getGroup(),
      this.getLatestPolls(),
      this.getPopularPolls()
  },
  methods: {
      formatDate(dateString) {
          const date = new Date(dateString);
              // Then specify how you want your dates to be formatted
          return Moment(date).format("MMM DD, YYYY");
      },
      async getGroup() {
          this.$store.commit('setIsLoading', true)
          await axios
              .get('/api/v1/groups/menu/')
              .then(response => {
                  this.groups = response.data
              })
              .catch(error => {
                  console.log(error)
              })

          this.$store.commit('setIsLoading', false)
      },
      async getLatestPolls() {
          this.$store.commit('setIsLoading', true)
          await axios
              .get('/api/v1/polls/latest/')
              .then(response => {
                  this.latest_polls = response.data
              })
              .catch(error => {
                  console.log(error)
              })

          this.$store.commit('setIsLoading', false)
      },
      async getPopularPolls() {
          this.$store.commit('setIsLoading', true)
          await axios
              .get('/api/v1/polls/popular/')
              .then(response => {
                  this.popular_polls = response.data
              })
              .catch(error => {
                  console.log(error)
              })

          this.$store.commit('setIsLoading', false)
      }
  }
}
</script>
