<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-pa-md">
      <span class="text-h5">
        Frontend test
      </span>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';

import {FieldTypes} from 'src/constants/fields'
import {Brand, Color, Engine, InteriorMaterial, WheelRim, WheelType} from 'src/constants/specifications'

import OptionRepository from 'src/repositories/OptionRepository'
import SpecificationRepository from 'src/repositories/SpecificationRepository'
import SpecificationOptionRepository from 'src/repositories/SpecificationOptionRepository'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    onMounted(async () => {
      // initial state
      const specs = [
        await SpecificationRepository.create({
          name: 'Sport',
          brand: Brand.BMW,
          engine: Engine.V8_40L,
          interiorMaterial: InteriorMaterial.LEATHER,
          color: Color.BLACK,
          wheelRim: WheelRim.INCH_22,
          wheelType: WheelType.BBS,
        }),
        await SpecificationRepository.create({
          name: 'Prestige',
          brand: Brand.MERCEDES,
          engine: Engine.L6_20L,
          interiorMaterial: InteriorMaterial.ECO_LEATHER,
          color: Color.WHITE,
          wheelRim: WheelRim.INCH_17,
          wheelType: WheelType.WOLF,
        }),
        await SpecificationRepository.create({
          name: 'Standard',
          brand: Brand.AUDI,
          engine: Engine.V6_35L,
          interiorMaterial: InteriorMaterial.TEXTILE,
          color: Color.GREY,
          wheelRim: WheelRim.INCH_20,
          wheelType: WheelType.TG_RACING,
        }),
      ]

      const opts = [
        await OptionRepository.create({
          name: 'Text',
          type: FieldTypes.text,
        }),
        await OptionRepository.create({
          name: 'Text',
          type: FieldTypes.checkbox,
        })
      ]

      for (const spec of specs) {
        for (const opt of opts) {
          await SpecificationOptionRepository.create({
            specificationId: spec.id,
            optionId: opt.id
          })
        }
      }
    })
  }
});
</script>
