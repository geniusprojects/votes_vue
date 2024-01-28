<template>
    <!-- Breadcrumb -->
    <div class="container">
      <div class="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
        <div class="f2-s-1 p-r-30 m-tb-6">
          <a href="index.html" class="breadcrumb-item f1-s-3 cl9">
            Home
          </a>

          <span class="breadcrumb-item f1-s-3 cl9">
            Log In
          </span>
        </div>
      </div>
    </div>

    <!-- Page heading -->
    <div class="container p-t-4 p-b-40 text-center">
      <h2 class="f1-l-1 cl2">
        Log In
      </h2>
    </div>

    <!-- Content -->
    <section class="bg0 p-b-60">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-6 p-b-80">
            <div class="p-r-10 p-r-0-sr991">
              <form @submit.prevent="submitForm">
                <input type="email" name="email" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="email" placeholder="Email*">
                <input type="password" name="password" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="password" placeholder="Password*">
                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <button class="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-20">
                  Войти
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
</template>

<script>
    import axios from 'axios'
    document.title = 'Авторизация | OprosNaRu';
    export default {
        name: 'LogIn',
        data() {
            return {
                username: '',
                password: '',
                email: '',
                errors: []
            }
        },
        methods: {
            async submitForm() {
                this.$store.commit('setIsLoading', true)
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')
                const formData = {
                    username: this.email,
                    email: this.email,
                    password: this.password
                }
                await axios
                    .post('/api/v1/token/login/', formData)
                    .then(response => {
                        const token = response.data.auth_token
                        this.$store.commit('setToken', token)
                        axios.defaults.headers.common['Authorization'] = 'Token ' + token
                        localStorage.setItem('token', token)
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again!')
                        }
                    })
                await axios
                    .get('/api/v1/users/me')
                    .then(response => {
                        let is_author = false;
                        let is_verify = false;
                        let is_promo = false;
                        let perm = '11';
                        for(let i=0;i<response.data.groups.length;i++){
                          if(response.data.groups[i]['name'] == 'Author'){
                            is_author = true;
                            perm = '33';
                          }
                          else if(response.data.groups[i]['name'] == 'Verify'){
                            is_verify = true;
                            perm = '55';
                          }
                          else if(response.data.groups[i]['name'] == 'Promo'){
                            is_promo = true;
                            perm = '77';
                          }
                        }
                        this.$store.commit('setUser', {
                          'id': response.data.id,
                          'username': response.data.username,
                          'is_author': is_author,
                          'is_verify': is_verify,
                          'is_promo': is_promo,
                        })
                        localStorage.setItem('username', response.data.username)
                        localStorage.setItem('userid', response.data.id)
                        localStorage.setItem('cols', perm[0] + Math.random() + perm[1])
                        //localStorage.setItem('is_author', is_author)
                        //localStorage.setItem('is_verify', is_verify)
                        //localStorage.setItem('is_promo', is_promo)
                        this.$router.push('/')
                    })
                    .catch(error => {
                        for (const property in error.response.data) {
                            this.errors.push(`${error.response.data[property]}`)
                        }
                        console.log(error)
                    })

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>