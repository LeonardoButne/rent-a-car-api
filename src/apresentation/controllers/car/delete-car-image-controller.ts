import { forbidden, ok, badRequest, serverError } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { CarImage } from '../../../domain/models/carImage';
import { resolve } from 'path';
import { unlink } from 'fs/promises';

export class DeleteCarImageController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { carId, imageId } = httpRequest.params;
      // 1. Busca a imagem no banco
      const image = await CarImage.findOne({ where: { id: imageId, carId } });
      if (!image) return badRequest(new Error('Imagem não encontrada'));

      // 2. Remove do disco
      const filePath = resolve(__dirname, '../../../infraestruture/uploads/img', image.fileName);
      try { await unlink(filePath); } catch {}

      // 3. Remove do banco
      await image.destroy();

      return ok({ message: 'Imagem removida com sucesso' });
    } catch (error) {
      return serverError({ error });
    }
  }
} 