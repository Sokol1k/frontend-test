import { Model } from '@vuex-orm/core'
import { v4 as uuidv4 } from 'uuid'
import { AttrField, OrmModel, PrimaryKey, UidField } from 'vuex-orm-decorators'

import { ModelNames } from 'src/constants/models'

@OrmModel(ModelNames.SPECIFICATION_OPTION)
export default class SpecificationOption extends Model {
  @UidField(() => uuidv4())
  public id!: string

  @PrimaryKey()
  @AttrField()
  public specificationId!: string

  @PrimaryKey()
  @AttrField()
  public optionId!: string

  @AttrField()
  public value!: string | boolean
}
