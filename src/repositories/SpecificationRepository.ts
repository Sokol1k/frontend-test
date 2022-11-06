import {Brand, Color, Engine, InteriorMaterial, WheelRim, WheelType} from 'src/constants/specifications'

import VuexOrmBaseRepository from 'src/repositories/VuexOrmBaseRepository'

import Specification from 'src/models/Specification'

interface SpecificationParams {
  name: string
  brand?: Brand
  engine?: Engine
  interiorMaterial?: InteriorMaterial
  color?: Color
  wheelRim?: WheelRim
  wheelType?: WheelType
}

class SpecificationRepository extends VuexOrmBaseRepository<Specification>{
  private model = Specification

  async create(data: SpecificationParams) {
    const response = await this.model.insert({ data })

    return response[this.model.entity][0] as Specification
  }

  async findByPk(id: string | number) {
    const response = await this.model.query().with('options').find(id)

    return response as Specification
  }

  findAll() {
    // todo: this.model.query().with('options').all() - not working, response incorrect data
    const items = this.model.all()

    return items.map(item => this.model.query().with('options').find(item.id)) as Specification[]
  }

  async update(data: SpecificationParams, options) {
    const response = await this.model.update({ where: options.where.id, data })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response as Specification
  }

  async delete(options) {
    await this.model.delete(options.where.id)
  }
}

export default new SpecificationRepository()
