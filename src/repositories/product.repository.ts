import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Orer} from '../models';
import {OrerRepository} from './orer.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly orer: HasOneRepositoryFactory<Orer, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrerRepository') protected orerRepositoryGetter: Getter<OrerRepository>,
  ) {
    super(Product, dataSource);
    this.orer = this.createHasOneRepositoryFactoryFor('orer', orerRepositoryGetter);
    this.registerInclusionResolver('orer', this.orer.inclusionResolver);
  }
}
