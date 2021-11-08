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
  Product,
  Orer,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOrerController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/orer', {
    responses: {
      '200': {
        description: 'Product has one Orer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orer),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Orer>,
  ): Promise<Orer> {
    return this.productRepository.orer(id).get(filter);
  }

  @post('/products/{id}/orer', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orer, {
            title: 'NewOrerInProduct',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) orer: Omit<Orer, 'id'>,
  ): Promise<Orer> {
    return this.productRepository.orer(id).create(orer);
  }

  @patch('/products/{id}/orer', {
    responses: {
      '200': {
        description: 'Product.Orer PATCH success count',
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
    return this.productRepository.orer(id).patch(orer, where);
  }

  @del('/products/{id}/orer', {
    responses: {
      '200': {
        description: 'Product.Orer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Orer)) where?: Where<Orer>,
  ): Promise<Count> {
    return this.productRepository.orer(id).delete(where);
  }
}
