import { badRequest, created, serverError, forbidden } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';
import { CreateCar } from '../../../domain/usecases/car/create-car-usecase';
import { OwnerSequelizeAdapter } from '../../../infraestruture/database/owner-sequelize-adapter';
import { CarImage } from '../../../domain/models/carImage';

export class CreateCarController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createCar: CreateCar
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
   
    try {
      console.log('BODY:', httpRequest.body);
      console.log('FILES:', httpRequest.files);
      const error = this.validation.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }

      const ownerId = httpRequest.token?.sub;
      const isSuspended = httpRequest.token?.isSuspended;

      if (!ownerId) {
        return badRequest(new Error('Proprietário não encontrado.'));
      }
      if (isSuspended) {
        return forbidden(new Error('Conta suspensa. Não é permitido cadastrar carros.'));
      }
      // Parse de campos numéricos e booleanos
      const carData = {
        ...httpRequest.body,
        ownerId,
        images: httpRequest.files || [],
        ano: httpRequest.body.ano ? Number(httpRequest.body.ano) : undefined,
        precoPorDia: httpRequest.body.precoPorDia ? Number(httpRequest.body.precoPorDia) : undefined,
        precoPorSemana: httpRequest.body.precoPorSemana ? Number(httpRequest.body.precoPorSemana) : undefined,
        precoPorMes: httpRequest.body.precoPorMes ? Number(httpRequest.body.precoPorMes) : undefined,
        quilometragem: httpRequest.body.quilometragem ? Number(httpRequest.body.quilometragem) : undefined,
        lugares: httpRequest.body.lugares ? Number(httpRequest.body.lugares) : undefined,
        featured: httpRequest.body.featured === 'true' || httpRequest.body.featured === true,
        disponibilidade: httpRequest.body.disponibilidade === 'true' || httpRequest.body.disponibilidade === true,
      };
      const car = await this.createCar.add(carData);

      

      return created(car);
    } catch (error) {
      if (error && error.stack) {
        console.error('STACK:', error.stack);
      }
      if (error.errors) {
        return serverError({
          erro: error?.errors?.map((err: any) => err?.message),
        })
      } else {
        return serverError({ error })
      }
    }
  }
} 