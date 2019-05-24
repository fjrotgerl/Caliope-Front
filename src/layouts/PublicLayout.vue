<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hHh lpR fFf" class="bg-black-gradient">

    <q-header class="bg-no-opacity text-accent">
      <q-toolbar id="menu-superior">
        <q-toolbar-title id="home-publica">
          <p @click="$router.push('/')">PARTE PÚBLICA</p>
        </q-toolbar-title>

<!--        <q-btn flat rounded color="accent" label="Ir a la parte privada (solo dev)" @click="$router.push('/user')"/>-->
        <div id="menu-superior">
        <q-btn flat rounded color="accent" label="Preguntas frecuentes" @click="$router.push('/faq')"/>

        <q-btn flat rounded color="accent" label="Iniciar sesión"  @click="loginWindow = true"/>

        <q-btn flat rounded color="accent" label="Registrarse" @click="$router.push('/registro')"/>

        </div>

      </q-toolbar>

      <!-- Login modal -->
      <!-- <div v-if="this.$q.screen.width > 500"> -->
        <q-dialog
          v-model="loginWindow"
        >
          <q-card style="width: 800px; max-width: 80vw; background: white;">
            <div style="padding: 5% 25%;">
              <div class="row" style="margin-bottom: 5%;">
                <q-card-section class="col-12">
                  <div class="text-h6">
                    Login
                  </div>
                </q-card-section>

                <q-card-actions class="absolute-top-right" >
                  <q-btn flat v-close-popup><i class="material-icons">clear</i></q-btn>
                </q-card-actions>

              </div>

              <div class="column justify-between" style="height: 150px;">
                <q-input class="col-xs" outlined v-model="usuario.username" label="Nombre de usuario" />

                <q-input type="password" style="text-align: center" class="col-xs-12" outlined v-model="usuario.password" label="Contraseña" />
              </div>

              <div class="row">
                <q-card-actions align="center" class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn flat v-close-popup @click="login()">Iniciar sesión</q-btn>
                </q-card-actions>

                <q-card-actions align="center" class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn flat v-close-popup @click="googleLogin()">Entrar con google</q-btn>
                </q-card-actions>
              </div>
            </div>

          </q-card>
        </q-dialog>
      <!--</div> -->

      <q-dialog v-model="errorWindow" @escape-key="errorWindow = false">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">Información</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <p v-text="errorMsg"></p>
          </q-card-section>
        </q-card>
      </q-dialog>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  const constants  = require('../statics/js/configuration');
  const md5        = require('md5');

  export default {
    data () {
      return {
        loginWindow: false,
        errorMsg: '',
        errorWindow: false,
        usuario: {
          username: "",
          password: ""
        },
        login: () => {
          this.$axios.post(constants.AUTH_API_URL + "/token-local", {
            username: this.usuario.username,
            password: md5(this.usuario.password)
          })
            .then(response => {
              localStorage.setItem("token",response.data);
              this.$router.push("/user/home");
            })
            .catch(() => {
              this.errorMsg = "Por favor, revisa tus credenciales";
              this.errorWindow = true;
            })
        },
      }
    },
    methods: {
      googleLogin: () => {
        window.open(constants.AUTH_API_URL + "/token-google");
      },
      goHome () {
        this.$router.push("/");
      }
    }
  }
</script>
