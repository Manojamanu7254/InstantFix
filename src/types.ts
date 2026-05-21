export interface Booking {
  id?: string;
  name: string;
  phone: string;
  deviceType: string;
  brand: string;
  model: string;
  imei?: string;
  issue: string;
  address: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
