<template>
<q-page class="flex flex-center bg-white q-pa-md column">
  <q-expansion-item class="pregunta"
    expand-separator
    icon="question_answer"
    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 1"
  >
    <q-card>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
        commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
        eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item>

  <q-expansion-item class="pregunta"
                    expand-separator
                    icon="question_answer"
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 2"
  >
    <q-card>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
        commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
        eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item>

  <q-expansion-item class="pregunta"
                    expand-separator
                    icon="question_answer"
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 3"
  >
    <q-card>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
        commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
        eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item>

  <q-expansion-item class="pregunta"
                    expand-separator
                    icon="question_answer"
                    label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 4"
  >
    <q-card>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
        commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
        eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item>
  
  <h3>CONTACTA CON NOSOTROS</h3>

    <div style="width: 50%;margin: 50px 0;background-color: beige;padding: 50px;">

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

        <q-toggle v-model="accept" label="Acepto los terminos y condiciones" />

        <div>
          <q-btn label="Envia" type="submit" color="primary"/>
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
