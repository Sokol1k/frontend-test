export interface OptionsInterface {
  where: any
}

export default abstract class VuexOrmBaseRepository<M> {
  abstract create(data: object): Promise<M>
  abstract findByPk(id: string | number): Promise<M>
  abstract findAll(): M[]
  abstract update(data: object, options: OptionsInterface): Promise<M>
  abstract delete(options: OptionsInterface): Promise<void>
}
