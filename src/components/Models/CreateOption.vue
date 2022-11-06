<template>
  <q-dialog v-model="open" persistent>
    <q-card title="Create option" style="min-width: 450px" class="q-pa-lg">
      <q-form @submit="onSubmit">
        <div class="text-h6 q-mb-md">Create Option</div>

        <q-input
          class="q-mb-md"
          filled
          v-model="name"
          label="Name"
          :rules="[ val => val && val.length > 0 || 'Field is required']"
        />
        <q-select
          class="q-mb-md"
          filled
          v-model="type"
          label="Type"
          :options="fieldTypes"
          :rules="[ val => val && val.length > 0 || 'Field is required']"
        />

        <div class="row justify-between">
          <q-btn color="red" label="Cancel" @click="onCancel" />
          <q-btn color="green" label="Add option" type="submit" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { FieldTypes } from 'src/constants/fields'

import OptionRepository from 'src/repositories/OptionRepository'
import SpecificationRepository from 'src/repositories/SpecificationRepository'
import SpecificationOptionRepository from 'src/repositories/SpecificationOptionRepository'

export default defineComponent({
  name: 'CreateOption',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const name = ref()
    const type = ref()

    const fieldTypes = ref(Object.values(FieldTypes))

    const close = () => {
      name.value = ''
      type.value = ''

      props.close()
    }

    return {
      name,
      type,

      fieldTypes,

      open: computed(() => props.isOpen),

      async onSubmit() {
        const option = await OptionRepository.create({
          name: name.value,
          type: type.value,
        })

        const specifications = SpecificationRepository.findAll()

        if (specifications.length) {
          for (const specification of specifications) {
            await SpecificationOptionRepository.create({
              specificationId: specification.id,
              optionId: option.id,
            })
          }
        }

        close()
      },

      onCancel() {
        close()
      },
    }
  }
})
</script>

<style scoped>

</style>
