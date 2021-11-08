import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Person,
  Orer,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonOrerController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/orers', {
    responses: {
      '200': {
        description: 'Array of Person has many Orer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Orer>,
  ): Promise<Orer[]> {
    return this.personRepository.orers(id).find(filter);
  }

  @post('/people/{id}/orers', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {
            title: 'NewOrerInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) orer: Omit<Orer, 'id'>,
  ): Promise<Orer> {
    return this.personRepository.orers(id).create(orer);
  }

  @patch('/people/{id}/orers', {
    responses: {
      '200': {
        description: 'Person.Orer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {partial: true}),
        },
      },
    })
    orer: Partial<Orer>,
    @param.query.object('where', getWhereSchemaFor(Orer)) where?: Where<Orer>,
  ): Promise<Count> {
    return this.personRepository.orers(id).patch(orer, where);
  }

  @del('/people/{id}/orers', {
    responses: {
      '200': {
        description: 'Person.Orer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Orer)) where?: Where<Orer>,
  ): Promise<Count> {
    return this.personRepository.orers(id).delete(where);
  }
}
