export interface ReservationsReport {
    totalReservations: number;
    reservationsByMonth: { [month: string]: number };
}

export interface GetReservationsReport {
    getReservationsReport(): Promise<ReservationsReport>;
} 