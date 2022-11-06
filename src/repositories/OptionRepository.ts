import { FieldTypes } from 'src/constants/fields'

import VuexOrmBaseRepository from 'src/repositories/VuexOrmBaseRepository'

import Option from 'src/models/Option'

interface OptionParams {
  name: string
  type: FieldTypes
}

class OptionRepository extends VuexOrmBaseRepository<Option> {
  private model = Option

  async create(data: OptionParams) {
    const response = await this.model.insert({ data })

    return response[this.model.entity][0] as Option
  }

  async findByPk(id: string | number) {
    const response = await this.model.find(id)

    return response as Option
  }

  findAll() {
    return this.model.all()
  }

  async update(data: OptionParams, options) {
    const response = await this.model.update({ where: options.where.id, data })

    return response[this.model.entity][0] as Option
  }

  async delete(options) {
    await this.model.delete(options.where.id)
  }
}

export default new OptionRepository()
