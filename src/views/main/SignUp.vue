<template>
    <!-- Breadcrumb -->
    <div class="container">
      <div class="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
        <div class="f2-s-1 p-r-30 m-tb-6">
          <a href="index.html" class="breadcrumb-item f1-s-3 cl9">
            Home
          </a>

          <span class="breadcrumb-item f1-s-3 cl9">
            Sign up
          </span>
        </div>
      </div>
    </div>

    <!-- Page heading -->
    <div class="container p-t-4 p-b-40 text-center">
      <h2 class="f1-l-1 cl2">
        Sign up
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
                <input type="password" name="password1" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="password1" placeholder="Password*">
                <input type="password" name="password2" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="password2" placeholder="Confirm Password*">
                <div class="notification is-danger" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <button class="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-20">
                  Sign Up
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
    import { toast } from 'bulma-toast'
    export default {
        name: 'SignUp',
        data() {
            return {
                username: '',
                email: '',
                password1: '',
                password2: '',
                errors: []
            }
        },
        methods: {
            async submitForm() {
                this.errors = []
                if (this.email === '') {
                    this.errors.push('The email is missing')
                }
                if (this.password1 === '') {
                    this.errors.push('The password is too short')
                }
                if (this.password1 !== this.password2) {
                    this.errors.push('The password are not matching')
                }
                if (!this.errors.length) {
                    this.$store.commit('setIsLoading', true)
                    const formData = {
                        username: this.email,
                        email: this.email,
                        password: this.password1
                    }
                    await axios
                        .post('/api/v1/users/', formData)
                        .then(response => {
                            toast({
                                message: 'Account was created, please log in',
                                type: 'is-success',
                                dismissible: true,
                                pauseOnHover: true,
                                duration: 2000,
                                position: 'bottom-right',
                            })
                            this.$router.push('/login')
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

                    this.$store.commit('setIsLoading', false)
                }
            }
        }
    }
</script>