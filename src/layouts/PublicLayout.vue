<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hhh lpR fFf" class="bg-img">

    <q-header class="bg-no-opacity text-accent">
      <q-toolbar id="menu-superior">
        <q-toolbar-title id="home-publica">
          <img class="logo-layout" src="" @click="$router.push('/')">
        </q-toolbar-title>

        <div id="menu-superior">
        <q-btn flat rounded color="accent" label="Contacto" @click="$router.push('/contacto')"/>

        <q-btn flat rounded color="accent" label="Iniciar sesión"  @click="loginWindow = true"/>

        <q-btn flat rounded color="accent" label="Registrarse" @click="$router.push('/registro')"/>

        </div>

      </q-toolbar>

      <!-- Login modal -->
        <q-dialog
          v-model="loginWindow"
        >
          <q-card style="background-color: white; width: 50%; margin-bottom: 20px; padding: 20px; -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px; box-shadow: 1px 1px 5px black;">
            <div >
              <div>
                <q-card-section>
                  <img style="text-align: center" src="../assets/caliope-soloIconlogo.svg">
                </q-card-section>

                <q-card-actions class="absolute-top-right" >
                  <q-btn flat v-close-popup><i class="material-icons">clear</i></q-btn>
                </q-card-actions>

              </div>

              <q-input outlined color="primary" bg-color="white" bottom-slots v-model="usuario.username" label="Nombre de usuario">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="usuario.username = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input outlined color="primary" bg-color="white" type="password" bottom-slots v-model="usuario.password" label="Contraseña">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="usuario.password = ''" class="cursor-pointer" />
                </template>
              </q-input>

              <q-separator inset />

              <div class="row">
                <q-card-section class="col-12">
                  <q-btn v-close-popup @click="login()" class="full-width" style="height: 40px;" color="white" text-color="black" icon="user" label="Entrar" />
                </q-card-section>

                <q-separator inset />

                <q-card-section class="col-12">

                  <q-btn v-close-popup @click="googleLogin()" class="full-width" style="height: 40px;" color="white" text-color="black" >
                    <img style="width: 25px; height: 25px; margin-bottom: 2px;" src="../assets/google.jpg">
                    Iniciar sesión con Google
                  </q-btn>
                </q-card-section>
              </div>
            </div>

          </q-card>
        </q-dialog>

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
              localStorage.setItem("user", this.usuario.username);
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
    },
  }
</script>
