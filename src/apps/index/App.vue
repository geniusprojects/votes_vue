<template>
    <Header />
    <router-view/>
    <Footer />
</template>

<script>
    import axios from 'axios'
    import Header from "@/components/layout/header";
    import Footer from "@/components/layout/footer";
    export default {
        name: 'App',
        components: {
          Header,
          Footer,
        },
        beforeCreate() {
            this.$store.commit('initializeStore')
            if (this.$store.state.token) {
                axios.defaults.headers.common['Authorization'] = "Token " + this.$store.state.token
            } else {
                axios.defaults.headers.common['Authorization'] = ""
            }
        },
    }
</script>

<style lang="scss">

</style>
