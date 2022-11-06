<template>
  <q-list class="specification-list q-mb-md">
    <q-expansion-item
      v-for="specification in specifications"
      :key="specification.id"
      :label="specification.name"
      :model-value="route.query.specificationId === specification.id"
      :to="{ path: route.path, query: { specificationId: specification.id } }"
      class="text-center"
      hide-expand-icon
    >
      <div>Brand - {{specification.brand}}</div>
      <div>Engine - {{specification.engine}}</div>
      <div>Interior Material - {{specification.interiorMaterial}}</div>
      <div>Color - {{specification.color}}</div>
      <div>Wheel Rim - {{specification.wheelRim}}</div>
      <div>Wheel  Type - {{specification.wheelType}}</div>
      <div
        v-for="option in specification.options"
        :key="option.id"
      >
        {{option.name}} - {{optionFormat(option.type, option.pivot.value)}}
      </div>
    </q-expansion-item>
  </q-list>
  <q-btn
    :to="{ path: route.path }"
    class="full-width"
    color="primary"
    label="+ Make new specification"
  />
</template>

<script lang="ts">
import {defineComponent, computed } from 'vue'

import { useRoute } from 'vue-router'

import { FieldTypes } from 'src/constants/fields'

import SpecificationRepository from 'src/repositories/SpecificationRepository'

export default defineComponent({
  name: 'SpecificationList',
  setup() {
    return {
      route: useRoute(),
      specifications: computed(() => SpecificationRepository.findAll()),
      optionFormat(type: FieldTypes, value) {
        switch (type) {
          case FieldTypes.checkbox:
            return value ? 'Yes' : 'No'
          case FieldTypes.text:
            return value
        }
      }
    }
  }
})
</script>

<style lang="scss">
.specification-list {
  .q-item {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .q-expansion-item__content {
    border: 2px dashed rgba(0, 0, 0, 0.05);
    border-top: unset;
  }
}
</style>
