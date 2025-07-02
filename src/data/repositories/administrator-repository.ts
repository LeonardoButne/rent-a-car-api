import { AdministradorAttributes } from "../../domain/models/administrator";
import { ClientAttributes } from "../../domain/models/client";
import { OwnerAttributes } from "../../domain/models/owner";
import { DashboardSummary } from "../../domain/usecases/administrator-usecases/get-dashboard-summary-usecase";
import { ReservationsReport } from "../../domain/usecases/administrator-usecases/get-reservations-report-usecase";
import { RevenueReport } from "../../domain/usecases/administrator-usecases/get-revenue-report-usecase";
import { AdministratorWithoutId, AdministratorModel } from "../../domain/usecases/administrator-usecases/signup-administrator-usecase";


export interface AdministratorRepository {
    add(data: AdministratorWithoutId): Promise<AdministratorModel>;
    deleteClient(clientId: string): Promise<boolean>;
    deleteOwner(ownerId: string): Promise<boolean>;
    getAccountByEmail(email: string): Promise<AdministratorModel>;
    getAccountById(id: string): Promise<AdministradorAttributes>;
    getSummary(): Promise<DashboardSummary>;
    getReservationsReport(): Promise<ReservationsReport>;
    getRevenueReport(): Promise<RevenueReport>;
    getByOwnerId(ownerId: string): Promise<OwnerAttributes | null>;
    listClients(): Promise<ClientAttributes[]>;
    listOwners(): Promise<OwnerAttributes[]>;
    listSubscriptions(): Promise<OwnerAttributes[]>;
    suspendClient(clientId: string): Promise<boolean>;
    suspendOwner(ownerId: string): Promise<boolean>;
    updateStatusAccountAdministrator(email: string): Promise<boolean>
    update(ownerId: string, data: any): Promise<boolean>;
} 