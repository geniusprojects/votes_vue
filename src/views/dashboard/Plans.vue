<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Plans</h1>
            </div>
            <div v-for="plan in plans" v-bind:key="plan.id" class="column is-4">
                <div class="box">
                    <h2 class="subtitle">{{ plan.name }}</h2>
                    <h4 class="is-size-3">${{ plan.price }}</h4>

                    <p>Max {{ plan.max_clients }} clients</p>
                    <p>Max {{ plan.max_leads }} leads</p>

                    <button @click="subscribe(plan.id)" class="button is-primary">Subscribe</button>
                </div>
            </div>

            <hr>

            <div class="column is-12">
                <button @click="cancelPlan()" class="button is-danger">Cancel plan</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import { toast } from 'bulma-toast'

export default {
    name: 'Plans',
    data() {
        return {
            plans: [],
            pub_key: '',
            stripe: null
        }
    },
    async mounted() {
        await this.getPubKey()
        await this.getPlans()

        this.stripe = Stripe(this.pub_key)
    },
    methods: {
        async getPlans() {
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/plans/`)
                .then(response => {
                    console.log(response.data)
                    this.plans = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getPubKey() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get(`/api/v1/stripe/get_stripe_pub_key/`)
                .then(response => {
                    this.pub_key = response.data.pub_key
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        async cancelPlan() {
            this.$store.commit('setIsLoading', true)

            axios
                .post('/api/v1/teams/cancel_plan/')
                .then(response => {
                    this.$store.commit('setTeam', {
                        'id': response.data.id, 
                        'name': response.data.name,
                        'plan': response.data.plan.name,
                        'max_leads': response.data.plan.max_leads,
                        'max_clients': response.data.plan.max_clients
                    })

                    toast({
                        message: 'The plan was cancelled!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })

                    this.$router.push('/dashboard/team')
                })

            this.$store.commit('setIsLoading', false)
        },
        async subscribe(plan) {
            this.$store.commit('setIsLoading', true)

            const data = {
                plan: plan
            }

            axios
                .post('/api/v1/stripe/create_checkout_session/', data)
                .then(response => {
                    console.log(response)
                    if('sessionId' in response.data){
                      return this.stripe.redirectToCheckout({sessionId: response.data.sessionId})
                    }
                })
                .catch(error => {
                    console.log('Error:', error)
                })

            await axios
                .post(`/api/v1/teams/upgrade_plan/`, data)
                .then(response => {
                    console.log('Upgraded plan')

                    console.log(response.data)

                    this.$store.commit('setTeam', {
                        'id': response.data.id, 
                        'name': response.data.name,
                        'plan': response.data.plan.name,
                        'max_leads': response.data.plan.max_leads,
                        'max_clients': response.data.plan.max_clients
                    })

                    toast({
                        message: 'The plan was changed!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })

                    this.$router.push('/dashboard/team')
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>