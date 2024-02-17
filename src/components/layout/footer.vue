<template>
    <!-- Footer -->
	<footer>
		<div class="bg2 p-t-40 p-b-25">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 p-b-20">
						<div class="size-h-3 flex-s-c">
							<router-link :to="{ name: 'mHomeView'}"><h1 style="font-family: 'custom'; font-size: 56px; color: #15A752;">OprosNaRu</h1></router-link>
						</div>

						<div>
							<p class="f1-s-1 cl11 p-b-16">
                Администрация сайта не несёт ответственности за какой-либо прямой, непрямой, особый или иной косвенный ущерб в результате использования информации на этом сайте или на любом другом сайте, на который имеется гиперссылка.
              </p>

							<p class="f1-s-1 cl11 p-b-16">
                Все вопросы и предложения принимаются на почту <a href="mailto:geniusprojects@yandex.ru">geniusprojects@yandex.ru</a>
							</p>

							<div class="p-t-15" style="display: none;">
								<a href="#" class="fs-18 cl11 hov-cl10 trans-03 m-r-8">
									<span class="fab fa-facebook-f"></span>
								</a>

								<a href="#" class="fs-18 cl11 hov-cl10 trans-03 m-r-8">
									<span class="fab fa-twitter"></span>
								</a>

								<a href="#" class="fs-18 cl11 hov-cl10 trans-03 m-r-8">
									<span class="fab fa-pinterest-p"></span>
								</a>

								<a href="#" class="fs-18 cl11 hov-cl10 trans-03 m-r-8">
									<span class="fab fa-vimeo-v"></span>
								</a>

								<a href="#" class="fs-18 cl11 hov-cl10 trans-03 m-r-8">
									<span class="fab fa-youtube"></span>
								</a>
							</div>
						</div>
					</div>

					<div class="col-sm-6 col-lg-4 p-b-20" style="display: none;">
						<div class="size-h-3 flex-s-c">
							<h5 class="f1-m-7 cl0">
								Popular Posts
							</h5>
						</div>

						<ul>
							<li class="flex-wr-sb-s p-b-20">
								<a href="#" class="size-w-4 wrap-pic-w hov1 trans-03">
									<img src="images/popular-post-01.jpg" alt="IMG">
								</a>

								<div class="size-w-5">
									<h6 class="p-b-5">
										<a href="#" class="f1-s-5 cl11 hov-cl10 trans-03">
											Donec metus orci, malesuada et lectus vitae
										</a>
									</h6>

									<span class="f1-s-3 cl6">
										Feb 17
									</span>
								</div>
							</li>
						</ul>
					</div>

					<div class="col-sm-6 col-lg-4 p-b-20" style="display: none;">
						<div class="size-h-3 flex-s-c">
							<h5 class="f1-m-7 cl0">
								Category
							</h5>
						</div>

						<ul class="m-t--12">
							<li class="how-bor1 p-rl-5 p-tb-10">
								<a href="#" class="f1-s-5 cl11 hov-cl10 trans-03 p-tb-8">
									Fashion (22)
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="bg11">
			<div class="container size-h-4 flex-c-c p-tb-15">
				<span id="copyright" class="f1-s-1 cl0 txt-center">
					Copyright © 2018
				</span>
			</div>
		</div>
	</footer>

  <!-- Back to top -->
	<div class="btn-back-to-top" id="myBtn">
		<span class="symbol-btn-back-to-top">
			<span class="fas fa-angle-up"></span>
		</span>
	</div>

	<!-- Modal Video 01-->
	<div class="modal fade" id="modal-video-01" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document" data-dismiss="modal">
			<div class="close-mo-video-01 trans-0-4" data-dismiss="modal" aria-label="Close">&times;</div>

			<div class="wrap-video-mo-01">
				<div class="video-mo-01">
					</div>
			</div>
		</div>
	</div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'Footer',
        mounted() {
          const currentYear = new Date().getFullYear();
          document.getElementById("copyright").innerHTML = ` © ${currentYear} OprosNa.Ru. Все права защищены.`;
        }
      // data() {
        //     return {
        //         groups: {
        //             categories: [],
        //         }
        //     }
        // },
        // mounted() {
        //     this.getGroup()
        // },
        // methods: {
        //     async getGroup() {
        //         this.$store.commit('setIsLoading', true)
        //         await axios
        //             .get('/api/v1/groups/')
        //             .then(response => {
        //                 this.groups = response.data
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //
        //         this.$store.commit('setIsLoading', false)
        //     }
        // }
    }
</script>