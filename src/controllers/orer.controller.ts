import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Orer} from '../models';
import {OrerRepository} from '../repositories';

export class OrerController {
  constructor(
    @repository(OrerRepository)
    public orerRepository : OrerRepository,
  ) {}

  @post('/orers')
  @response(200, {
    description: 'Orer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {
            title: 'NewOrer',
            exclude: ['id'],
          }),
        },
      },
    })
    orer: Omit<Orer, 'id'>,
  ): Promise<Orer> {
    return this.orerRepository.create(orer);
  }

  @get('/orers/count')
  @response(200, {
    description: 'Orer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Orer) where?: Where<Orer>,
  ): Promise<Count> {
    return this.orerRepository.count(where);
  }

  @get('/orers')
  @response(200, {
    description: 'Array of Orer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Orer) filter?: Filter<Orer>,
  ): Promise<Orer[]> {
    return this.orerRepository.find(filter);
  }

  @patch('/orers')
  @response(200, {
    description: 'Orer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {partial: true}),
        },
      },
    })
    orer: Orer,
    @param.where(Orer) where?: Where<Orer>,
  ): Promise<Count> {
    return this.orerRepository.updateAll(orer, where);
  }

  @get('/orers/{id}')
  @response(200, {
    description: 'Orer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Orer, {exclude: 'where'}) filter?: FilterExcludingWhere<Orer>
  ): Promise<Orer> {
    return this.orerRepository.findById(id, filter);
  }

  @patch('/orers/{id}')
  @response(204, {
    description: 'Orer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {partial: true}),
        },
      },
    })
    orer: Orer,
  ): Promise<void> {
    await this.orerRepository.updateById(id, orer);
  }

  @put('/orers/{id}')
  @response(204, {
    description: 'Orer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orer: Orer,
  ): Promise<void> {
    await this.orerRepository.replaceById(id, orer);
  }

  @del('/orers/{id}')
  @response(204, {
    description: 'Orer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orerRepository.deleteById(id);
  }
}
