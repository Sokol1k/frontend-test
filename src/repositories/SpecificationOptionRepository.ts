import SpecificationOption from 'src/models/SpecificationOption'

import VuexOrmBaseRepository from 'src/repositories/VuexOrmBaseRepository'

interface SpecificationOptionParams {
  specificationId: string
  optionId: string
  value?: string | boolean
}

class SpecificationOptionRepository extends VuexOrmBaseRepository<SpecificationOption> {
  private model = SpecificationOption

  async create(data: SpecificationOptionParams) {
    const response = await this.model.insert({ data })

    return response[this.model.entity][0] as SpecificationOption
  }

  async findByPk(id: string | number) {
    const response = await this.model.find(id)

    return response as SpecificationOption
  }

  findAll() {
    return this.model.all()
  }

  async update(data: { value }, options) {
    const response = await this.model.update({
      where: (item) =>
        item.specificationId === options.where.specificationId && item.optionId === options.where.optionId,
      data
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response as SpecificationOption
  }

  async delete(options) {
    await this.model.delete(options.where.id)
  }
}

export default new SpecificationOptionRepository()
