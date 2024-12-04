export interface Target {
  price: number;
  reached: boolean;
  reachedAt?: Date;
}

export interface Signal {
  id: string;
  coin: string;
  entryPrice: number;
  targets: Target[];
  stopLoss: number;
  createdAt: Date;
  notes?: string;
  currentPrice?: number;
  status: 'ACTIVE' | 'HIT_TARGET' | 'STOPPED_OUT';
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}