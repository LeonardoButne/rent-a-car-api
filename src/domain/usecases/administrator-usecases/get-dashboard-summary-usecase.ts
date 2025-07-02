export interface DashboardSummary {
    totalClients: number;
    totalOwners: number;
    totalReservations: number;
    totalRevenue: number;
    revenueByMonth: { [month: string]: number };
}

export interface GetDashboardSummary {
    getSummary(): Promise<DashboardSummary>;
} 