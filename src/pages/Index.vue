<template>
  <q-page class="flex flex-center">
    <q-knob
      show-value
      class="text-white q-ma-md"
      v-model="value"
      size="90px"
      :thickness="0.2"
      color="orange"
      center-color="grey-8"
      track-color="transparent"
    ><q-icon name="volume_up" />
    </q-knob>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Index'
}
</script>
