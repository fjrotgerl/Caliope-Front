<template>
<q-page class="flex flex-center q-pa-md column">

  
  <h3 class="text-white" style="text-shadow: 2px 2px 5px black;">CONTACTA CON NOSOTROS</h3>

    <div style="background-color:white; width: 50%; margin-bottom: 20px; padding: 20px; -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px; box-shadow: 1px 1px 5px black;">

      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="email"
          label="Introduce tu Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe correctamente tu email']"
        />

        <q-input
          filled
          v-model="asunto"
          label="Introduce tu asunto"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Escribe correctamente tu email']"
        />

        <q-input
          v-model="text"
          label="Escribe tu mensaje"
          filled
          type="textarea"
        />

        <div>
          <q-btn style="width: 100%; " label="Envia" type="submit" color="primary"/>
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: '',
  data () {
    return {
      email: "",
      asunto: "",
      text: "",
      accept: false
    }
  },
  methods: {
    onSubmit: () => console.log("Submit")
  }
}
</script>
