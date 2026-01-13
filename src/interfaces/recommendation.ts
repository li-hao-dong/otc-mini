export interface RecommendationItemResp {
    /**
     * Stock code from local CSV (kept as-is).
     */
    code: string;
    /**
     * Latest close/price.
     */
    latest_price: number | null;
    /**
     * Stock name from local CSV.
     */
    name: string;
    /**
     * Daily percent change (%).
     */
    pct_change: number | null;
    /**
     * 5-day percent change (%).
     */
    pct_change_5d: number | null;
}
