import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import VuexORM from '@vuex-orm/core'

import Option from 'src/models/Option'
import Specification from 'src/models/Specification'
import SpecificationOption from 'src/models/SpecificationOption'

const database = new VuexORM.Database()

database.register(Option)
database.register(Specification)
database.register(SpecificationOption)

export default store(function () {
  const Store = createStore({
    plugins: [VuexORM.install(database)],

    strict: !!process.env.DEBUGGING
  })

  return Store;
})
