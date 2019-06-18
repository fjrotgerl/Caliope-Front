<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex flex-center">


  </q-page>
</template>

<style>
</style>

<script>

  const md5        = require('md5');
  const constants  = require('../statics/js/configuration');

export default {
  name: 'Register',
  data () {
    return {
      redirect: async () => {
        let refreshtoken = await this.$route.query.refreshToken;
        let user = await this.$route.query.user;
        if (refreshtoken !== null && user !== null) {
          localStorage.setItem("token",refreshtoken);
          localStorage.setItem("user",user);
          this.$router.push("/user/home");
        } else {
          this.$router.push("/");
        }
      }
    }
  },
  async mounted() {
    await this.redirect();
  }
}
</script>
