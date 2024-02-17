<template>
			<div class="topbar">
				<div class="content-topbar container h-100">
					<div class="left-topbar">

            <router-link v-if="!$store.state.isAuthenticated" :class="'left-topbar-item'" :to="{ name: 'LogIn',}">
                <i class="fa fa-user"></i>
            </router-link>
            <a href="#" v-else :class="'left-topbar-item'" @click="logout()">
                <i class="fa fa-sign-out-alt"></i>
            </a>

            <router-link v-if="!$store.state.isAuthenticated" :class="'left-topbar-item'" :to="{ name: 'SignUp',}">
                <i class="fa fa-sign-in-alt"></i>
            </router-link>
            <router-link v-else-if="$store.state.user.is_author || $store.state.user.is_promo" :class="'left-topbar-item'" :to="{ name: 'AddPoll',}">
                <i class="far fa-plus-square" title="Добавить опрос"></i>
            </router-link>
					</div>

					<div class="right-topbar" hidden>
						<a href="#">
							<span class="fab fa-facebook-f"></span>
						</a>

						<a href="#">
							<span class="fab fa-twitter"></span>
						</a>

						<a href="#">
							<span class="fab fa-pinterest-p"></span>
						</a>

						<a href="#">
							<span class="fab fa-vimeo-v"></span>
						</a>

						<a href="#">
							<span class="fab fa-youtube"></span>
						</a>
					</div>
				</div>
			</div>

			<!-- Header Mobile -->
			<div class="wrap-header-mobile">
				<!-- Logo moblie -->
				<div class="logo-mobile">
					<a href="/"><h1 style="font-family: 'custom'; font-size: 36px; color: #15A752;">OprosNaRu</h1></a>
				</div>

				<!-- Button show menu -->
				<div class="btn-show-menu-mobile hamburger hamburger--squeeze m-r--8">
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
				</div>
			</div>

			<!-- Menu Mobile -->
			<div class="menu-mobile">
				<ul class="topbar-mobile">

					<li class="left-topbar">
						<router-link v-if="!$store.state.isAuthenticated" :class="'left-topbar-item'" :to="{ name: 'LogIn',}">
                <i class="fa fa-user"></i>
            </router-link>
            <a href="#" v-else :class="'left-topbar-item'" @click="logout()">
                <i class="fa fa-sign-out-alt"></i>
            </a>

            <router-link v-if="!$store.state.isAuthenticated" :class="'left-topbar-item'" :to="{ name: 'SignUp',}">
                <i class="fa fa-sign-in-alt"></i>
            </router-link>
            <router-link v-else-if="$store.state.user.is_author || $store.state.user.is_promo" :class="'left-topbar-item'" :to="{ name: 'AddPoll',}">
                <i class="far fa-plus-square" title="Добавить опрос"></i>
            </router-link>
					</li>

					<li class="right-topbar">
<!--						<a href="#">-->
<!--							<span class="fab fa-facebook-f"></span>-->
<!--						</a>-->

<!--						<a href="#">-->
<!--							<span class="fab fa-twitter"></span>-->
<!--						</a>-->

<!--						<a href="#">-->
<!--							<span class="fab fa-pinterest-p"></span>-->
<!--						</a>-->

<!--						<a href="#">-->
<!--							<span class="fab fa-vimeo-v"></span>-->
<!--						</a>-->

<!--						<a href="#">-->
<!--							<span class="fab fa-youtube"></span>-->
<!--						</a>-->
					</li>
				</ul>

				<ul class="main-menu-m">

					<li>
						<a href="index.html">Home</a>
						<ul class="sub-menu-m">
							<li><a href="index.html">Homepage v1</a></li>
							<li><a href="home-02.html">Homepage v2</a></li>
							<li><a href="home-03.html">Homepage v3</a></li>
						</ul>

						<span class="arrow-main-menu-m">
							<i class="fa fa-angle-right" aria-hidden="true"></i>
						</span>
					</li>

					<li>
						<a href="category-01.html">News</a>
					</li>

					<li>
						<a href="category-02.html">Entertainment </a>
					</li>

					<li>
						<a href="category-01.html">Business</a>
					</li>

					<li>
						<a href="category-02.html">Travel</a>
					</li>

					<li>
						<a href="category-01.html">Life Style</a>
					</li>

					<li>
						<a href="category-02.html">Video</a>
					</li>

					<li>
						<a href="#">Features</a>
						<ul class="sub-menu-m">
							<li><a href="category-01.html">Category Page v1</a></li>
							<li><a href="category-02.html">Category Page v2</a></li>
							<li><a href="blog-grid.html">Blog Grid Sidebar</a></li>
							<li><a href="blog-list-01.html">Blog List Sidebar v1</a></li>
							<li><a href="blog-list-02.html">Blog List Sidebar v2</a></li>
							<li><a href="blog-detail-01.html">Blog Detail Sidebar</a></li>
							<li><a href="blog-detail-02.html">Blog Detail No Sidebar</a></li>
							<li><a href="about.html">About Us</a></li>
							<li><a href="contact.html">Contact Us</a></li>
						</ul>

						<span class="arrow-main-menu-m">
							<i class="fa fa-angle-right" aria-hidden="true"></i>
						</span>
					</li>
				</ul>
			</div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'MainMenu',
        methods: {
            async logout() {
                await axios
                    .post('/api/v1/token/logout/')
                    .then(response => {
                        console.log('Logged out')
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error))
                    })

                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('userid')
                localStorage.removeItem('cols')
                //localStorage.removeItem('is_author')
                //localStorage.removeItem('is_verify')
                //localStorage.removeItem('is_promo')
                localStorage.removeItem('team_name')
                localStorage.removeItem('team_id')
                this.$store.commit('removeToken')

                this.$router.push('/')
            }
        }
    }
</script>