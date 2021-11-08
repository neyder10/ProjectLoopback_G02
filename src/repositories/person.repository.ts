import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Person, PersonRelations, Orer} from '../models';
import {OrerRepository} from './orer.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly orers: HasManyRepositoryFactory<Orer, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrerRepository') protected orerRepositoryGetter: Getter<OrerRepository>,
  ) {
    super(Person, dataSource);
    this.orers = this.createHasManyRepositoryFactoryFor('orers', orerRepositoryGetter,);
    this.registerInclusionResolver('orers', this.orers.inclusionResolver);
  }
}
