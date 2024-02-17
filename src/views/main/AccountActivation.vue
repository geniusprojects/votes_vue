<template>
    <!-- Breadcrumb -->
    <div class="container">
      <div class="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
        <div class="f2-s-1 p-r-30 m-tb-6">

          <router-link :class="'breadcrumb-item f1-s-3 cl9'" :to="{ name: 'mHomeView'}" style="padding: 3px;"><i class="fa fa-home"></i></router-link>

          <span class="breadcrumb-item f1-s-3 cl9">
            Активация Аккаунта
          </span>
        </div>
      </div>
    </div>

    <!-- Page heading -->
    <div class="container p-t-4 p-b-40 text-center">
      <h2 class="f1-l-1 cl2">
        Активация Аккаунта
      </h2>
    </div>

    <!-- Content -->
    <section class="bg0 p-b-60">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-6 p-b-80">
              {{ alert }}
          </div>

        </div>
      </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import { toast } from 'bulma-toast'
    export default {
        name: 'AccountActivation',
        data() {
            return {
                alert: ''
            }
        },
        mounted() {
            this.check_account()
        },
        methods: {
            async check_account() {
                this.$store.commit('setIsLoading', true)
                const uid = this.$route.params.uid
                const token = this.$route.params.token
                await axios
                    .post(`/api/v1/users/activation/`, { uid, token })
                    .then(response => {
                        this.alert = 'Your account has been activated. Please wait redirect'
                        setTimeout( () => this.$router.push('/login'), 5000);
                    })
                    .catch(error => {
                        this.alert = 'Problem during account activation.'
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>