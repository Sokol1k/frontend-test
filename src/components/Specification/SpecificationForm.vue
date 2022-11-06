<template>
  <q-form @submit="onSubmit">
    <q-input
      filled
      v-model="name"
      label="Name of specification *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Field is required']"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="brand"
      label="Brand"
      :options="brandOptions"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="engine"
      label="Engine"
      :options="engineOptions"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="interiorMaterial"
      label="Interior Material"
      :options="interiorMaterialOptions"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="color"
      label="Color"
      :options="colorOptions"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="wheelRim"
      label="Wheel Rim"
      :options="wheelRimOptions"
    />

    <q-select
      class="q-mb-md"
      filled
      v-model="wheelType"
      label="Wheel Type"
      :options="wheelTypeOptions"
    />

    <template
      v-for="(option) in options"
      :key="option.id"
    >
      <q-input
        class="q-mb-md"
        filled
        v-if="option.type === fieldTypes.text"
        :label="option.name"
        v-model="optionsValue[option.id]"
      />
      <q-checkbox
        class="q-mb-md"
        v-else-if="option.type === fieldTypes.checkbox"
        :label="option.name"
        v-model="optionsValue[option.id]"
        :indeterminate-value="false"
      />
    </template>

    <div class="row items-center justify-between">
      <q-btn color="primary" label="+ new configuration option" @click="isOpen = true" />
      <q-btn color="green" v-if="!specificationId" type="submit" label="save" />
      <q-btn color="yellow" text-color="black" v-else type="submit" label="update" />
    </div>
  </q-form>

  <create-option :is-open="isOpen" :close="closeModal" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { FieldTypes } from 'src/constants/fields'
import { Brand, Engine, InteriorMaterial, Color, WheelRim, WheelType } from 'src/constants/specifications'

import CreateOption from 'src/components/Models/CreateOption.vue'

import OptionRepository from 'src/repositories/OptionRepository'
import SpecificationRepository from 'src/repositories/SpecificationRepository'
import SpecificationOptionRepository from 'src/repositories/SpecificationOptionRepository'

export default defineComponent({
  name: 'SpecificationForm',
  components: { CreateOption },
  setup() {
    const isOpen = ref(false)

    const specificationId = ref('')

    const name = ref('')
    const brand = ref()
    const engine = ref()
    const interiorMaterial = ref()
    const color = ref()
    const wheelRim = ref()
    const wheelType = ref()
    const optionsValue = ref({})

    const brandOptions = ref(Object.values(Brand))
    const engineOptions = ref(Object.values(Engine))
    const interiorMaterialOptions = ref(Object.values(InteriorMaterial))
    const colorOptions = ref(Object.values(Color))
    const wheelRimOptions = ref(Object.values(WheelRim))
    const wheelTypeOptions = ref(Object.values(WheelType))

    const fieldTypes = ref(FieldTypes)

    const options = computed(() => OptionRepository.findAll())

    const route = useRoute()
    const router = useRouter()

    const resetForm = () => {
      name.value = ''
      name.value = ''
      brand.value = ''
      engine.value = ''
      interiorMaterial.value = ''
      color.value = ''
      wheelRim.value = ''
      wheelType.value = ''
      optionsValue.value = {}
    }

    watch(() => route.query, async (data) => {
      specificationId.value = data.specificationId as string ||  ''
    })

    watch(specificationId, async (id: string) => {
      if (id) {
        const specification = await SpecificationRepository.findByPk(id)

        name.value = specification.name
        brand.value = specification.brand
        engine.value = specification.engine
        interiorMaterial.value = specification.interiorMaterial
        color.value = specification.color
        wheelRim.value = specification.wheelRim
        wheelType.value = specification.wheelType

        optionsValue.value = specification.options.reduce((result, option) => {
          return {
            ...result,
            [option.id]: option?.pivot.value
          }
        }, {})

        return
      }

      resetForm()
    })

    return {
      isOpen,

      specificationId,

      name,
      brand,
      engine,
      interiorMaterial,
      color,
      wheelRim,
      wheelType,
      optionsValue,

      fieldTypes,

      brandOptions,
      engineOptions,
      interiorMaterialOptions,
      colorOptions,
      wheelRimOptions,
      wheelTypeOptions,

      options,

      closeModal() {
        isOpen.value = false
      },

      onSubmit() {
        if (specificationId.value) {
         SpecificationRepository.update( {
           name: name.value,
           brand: brand.value,
           engine: engine.value,
           interiorMaterial: interiorMaterial.value,
           color: color.value,
           wheelRim: wheelRim.value,
           wheelType: wheelType.value,
         }, {
           where: {
             id: specificationId.value
           }
         })
           .then(async (specification) => {
             for (const [key, value] of Object.entries(optionsValue.value)) {
               await SpecificationOptionRepository.update({ value: value as string | boolean }, {
                 where: {
                   specificationId: specification.id,
                   optionId: key
                 }
               })
             }
           })

         return
        }

        SpecificationRepository.create({
          name: name.value,
          brand: brand.value,
          engine: engine.value,
          interiorMaterial: interiorMaterial.value,
          color: color.value,
          wheelRim: wheelRim.value,
          wheelType: wheelType.value,
        })
        .then(async specification => {
          for (const option of OptionRepository.findAll()) {
            await SpecificationOptionRepository.create({
              specificationId: specification.id,
              optionId: option.id,
              value: optionsValue.value[option.id]
            })
          }

          specificationId.value = specification.id
          await router.push({ path: route.path, query: { specificationId: specification.id } })
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
