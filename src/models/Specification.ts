import { Model} from '@vuex-orm/core'
import { v4 as uuidv4 } from 'uuid'
import { OrmModel, StringField, UidField, BelongsToManyField } from 'vuex-orm-decorators'

import { ModelNames } from '../constants/models'
import { Brand, Engine, InteriorMaterial, Color, WheelRim, WheelType } from '../constants/specifications'

import Option from 'src/models/Option'
import SpecificationOption from 'src/models/SpecificationOption'

@OrmModel(ModelNames.SPECIFICATION)
export default class Specification extends Model {
  @UidField(() => uuidv4())
  public id!: string

  @StringField()
  public name!: string

  @StringField()
  public brand!: Brand

  @StringField()
  public engine!: Engine

  @StringField()
  public interiorMaterial!: InteriorMaterial

  @StringField()
  public color!: Color

  @StringField()
  public wheelRim!: WheelRim

  @StringField()
  public wheelType!: WheelType

  @BelongsToManyField(Option, SpecificationOption, 'specificationId', 'optionId')
  public options!: Option[]
}
