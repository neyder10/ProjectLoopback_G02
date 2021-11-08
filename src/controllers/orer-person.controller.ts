import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orer,
  Person,
} from '../models';
import {OrerRepository} from '../repositories';

export class OrerPersonController {
  constructor(
    @repository(OrerRepository)
    public orerRepository: OrerRepository,
  ) { }

  @get('/orers/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Orer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Orer.prototype.id,
  ): Promise<Person> {
    return this.orerRepository.person(id);
  }
}
