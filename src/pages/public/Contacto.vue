<template>
<q-page class="flex flex-center q-pa-md column">


  <h3 class="text-white" style="text-shadow: 2px 2px 5px black;">CONTACTA CON NOSOTROS</h3>

    <div style="background-color:white; width: 50%; margin-bottom: 20px; padding: 20px; -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px; box-shadow: 1px 1px 5px black;">

      <div>
        <p class="text-body2" style="padding: 10px 10px 30px 10px;">Por favor envíe sus preguntas, comentarios o inquietudes llenando el formulario a continuación. Haremos todo lo posible para responderle lo más rápido posible, generalmente dentro de 1 a 2 días hábiles.</p>
      </div>

      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="email"
          label="Introduce tu Email"
        />

        <q-input
          filled
          v-model="asunto"
          label="Introduce tu asunto"
        />

        <q-input
          v-model="text"
          label="Escribe tu mensaje"
          filled
          type="textarea"
        />

        <div>
          <q-btn v-close-popup @click="sendMail" type="submit" class="full-width" style="height: 40px;" color="white" text-color="black" icon="email" label="Enviar mensaje" />
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
  const constants  = require('../../statics/js/configuration');

  export default {
  name: '',
  data () {
    return {
      email: "",
      asunto: "",
      text: "",
      accept: false,
      sendMail: () => {
        this.$axios.post(constants.AUTH_API_URL + "/sendmail", {
          'mail': {
            'to': "caliope.no.reply@gmail.com",
            'subject': this.asunto,
            'message': "Email del usuario: " + this.email + "\n" + this.text
          }
        })
      }
    }
  },
  methods: {
    onSubmit: () => console.log("Submit")
  }
}
</script>
