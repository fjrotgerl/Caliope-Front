<template>
<q-page class="flex flex-center">
  <div class="pregunta">
    <div class="enunciado">
      <h4>Lorem ipsum dolor sit amet ?</h4>
      <img src="../../assets/Ico-Desplegar.svg" width="25px">
    </div>
    <div class="respuesta">
      <p>Etiam consequat fermentum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Phasellus pretium aliquam augue, sit amet dapibus neque maximus vel.</p>
    </div>
  </div>

  <div class="pregunta">
    <div class="enunciado">
      <h4>Lorem ipsum dolor sit amet ?</h4>
      <img src="../../assets/Ico-Desplegar.svg" width="25px">
    </div>
    <div class="respuesta">
      <p>Etiam consequat fermentum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Phasellus pretium aliquam augue, sit amet dapibus neque maximus vel.</p>
    </div>
  </div>

  <div class="pregunta">
    <div class="enunciado">
      <h4>Lorem ipsum dolor sit amet ?</h4>
      <img src="../../assets/Ico-Desplegar.svg" width="25px">
    </div>
    <div class="respuesta">
      <p>Etiam consequat fermentum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Phasellus pretium aliquam augue, sit amet dapibus neque maximus vel.</p>
    </div>
  </div>

  <div class="pregunta">
    <div class="enunciado">
      <h4>Lorem ipsum dolor sit amet ?</h4>
      <img src="../../assets/Ico-Desplegar.svg" width="25px">
    </div>
    <div class="respuesta">
      <p>Etiam consequat fermentum finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Phasellus pretium aliquam augue, sit amet dapibus neque maximus vel.</p>
    </div>
  </div>
    <div style="width: 50%;margin: 50px 0;">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
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
  name: ''
}
</script>
