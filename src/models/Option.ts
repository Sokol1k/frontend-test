import { Model } from '@vuex-orm/core'
import { v4 as uuidv4 } from 'uuid'
import {AttrField, OrmModel, StringField, UidField} from 'vuex-orm-decorators'

import { ModelNames } from '../constants/models'
import { FieldTypes } from '../constants/fields'

import SpecificationOption from 'src/models/SpecificationOption'

@OrmModel(ModelNames.OPTION)
export default class Option extends Model {
  @UidField(() => uuidv4())
  public id!: string

  @StringField()
  public name!: string

  @StringField()
  public type!: FieldTypes

  @AttrField()
  public pivot!: SpecificationOption
}
