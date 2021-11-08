import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Orer, OrerRelations, Person} from '../models';
import {PersonRepository} from './person.repository';

export class OrerRepository extends DefaultCrudRepository<
  Orer,
  typeof Orer.prototype.id,
  OrerRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Orer.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(Orer, dataSource);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
