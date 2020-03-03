export interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  subscriptionType?: string;
  emailVerified: boolean;
}
