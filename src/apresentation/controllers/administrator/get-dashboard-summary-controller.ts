import { ok, serverError } from '../../helpers/http-helpers';
import { GetDashboardSummary } from '../../../domain/usecases/administrator-usecases/get-dashboard-summary-usecase';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Validation } from '../../protocols/validation';

export class GetDashboardSummaryController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getDashboardSummary: GetDashboardSummary,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest);
      if (error) {
        return { statusCode: 400, body: error };
      }
      const summary = await this.getDashboardSummary.getSummary();
      return ok(summary);
    } catch (error) {
      return serverError({ error });
    }
  }
} 