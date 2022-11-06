<template>
  <q-page class="row items-center justify-evenly">
    <div class="col q-pa-lg">
      <specification-list />
    </div>
    <div class="col q-pa-lg">
      <specification-form />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SpecificationForm from 'components/Specification/SpecificationForm.vue'
import SpecificationList from 'components/Specification/SpecificationList.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { SpecificationList, SpecificationForm },
});
</script>
