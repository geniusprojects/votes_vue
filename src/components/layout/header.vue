<template>
    <!-- Header -->
	<header>
		<!-- Header desktop -->
		<div class="container-menu-desktop">
      <MainMenu />

			<!--  -->
			<div class="wrap-logo container no-banner">
				<!-- Logo desktop -->
				<div class="logo">
          <router-link :to="{ name: 'mHomeView'}"><h1 style="font-family: 'custom'; font-size: 96px; color: #15A752;">OprosNaRu</h1></router-link>
					<!--<a href="/"><img src="/frontend/images/voteps.png" alt="LOGO"></a>-->
				</div>

				<!-- Banner -->
<!--				<div class="banner-header">-->
<!--					<a href="https://themewagon.com/themes/free-bootstrap-4-html5-news-website-template-magnews2/"><img src="images/banner-01.jpg" alt="IMG"></a>-->
<!--				</div>-->
			</div>

			<!--  -->
			<div class="wrap-main-nav">
				<div class="main-nav">
					<!-- Menu desktop -->
					<nav class="menu-desktop">
            <router-link :class="'logo-stick'" :to="{ name: 'mHomeView'}"><h1 style="font-family: 'custom'; font-size: 36px; color: #15A752;">OprosNaRu</h1></router-link>

						<ul class="main-menu justify-content-center">

							<li class="mega-menu-item" v-for="group in groups" v-bind:key="group.id">
                <router-link :to="'/groups/' + group.id">{{ group.title }}</router-link>

								<div class="sub-mega-menu">
									<div class="nav flex-column nav-pills" role="tablist">
										<a class="nav-link" data-toggle="pill" role="tab" v-for="(category, index) in group.categories" v-bind:href="'#news-'+category.id" v-bind:class="index == 0 ? 'active' : ''">{{ category.title }}</a>
									</div>

									<div class="tab-content">
										<div class="tab-pane" role="tabpanel" v-for="(category, index) in group.categories" v-bind:id="'news-'+category.id" v-bind:key="category.id" v-bind:class="index == 0 ? 'active' : ''">
											<div class="row">
												<div class="col-3" v-for="poll in category.polls">
													<!-- Item post -->
													<div>
                            <router-link :class="'wrap-pic-w hov1 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
                                <img v-bind:src="poll.main_image ? poll.main_image.path : '/frontend/images/voteps_no_img.png'" alt="IMG">
                            </router-link>
														<div class="p-t-10">
															<h5 class="p-b-5">
                                <router-link :class="'1-s-5 cl3 hov-cl10 trans-03'" :to="{ name: 'Poll', params: { id: poll.uid }}">
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
																	{{ formatDate(poll.updated) }}
																</span>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</li>
              <li style="position: absolute; right: 0; padding: 10px 0 10px 0;">
                <input class="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search" style="border: 1px #c3e6cb  solid; border-radius: 5px;">
                <button class="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
                  <i class="zmdi zmdi-search"></i>
                </button>
              </li>

						</ul>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
    import MainMenu from "@/components/layout/mainmenu.vue";
    import axios from "axios";
    import Moment from 'moment'
    export default {
        name: 'Header',
        components: {
          MainMenu
        },
        data() {
            return {
                groups: {
                    categories: [],
                }
            }
        },
        mounted() {
            this.getGroup()
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
            }
        }
    }
</script>