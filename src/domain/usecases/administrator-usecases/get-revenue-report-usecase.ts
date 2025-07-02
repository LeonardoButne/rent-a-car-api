export interface RevenueReport {
    totalRevenue: number;
    revenueByMonth: { [month: string]: number };
}

export interface GetRevenueReport {
    getRevenueReport(): Promise<RevenueReport>;
} 