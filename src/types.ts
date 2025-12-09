
export interface NonprofitProfile {
  orgName: string;
  mission: string;
  goals: string;
  needs: string;
  address: string;
  contactName: string;
  contactPhone: string;
  email: string;
  website: string;
  taxId: string;
}

export interface GrantProject {
  id: string;
  grantTitle: string;
  funder: string;
  status: 'Draft' | 'Submitted' | 'Awarded' | 'Declined';
  proposal: string;
  lastEdited: string;
}

export interface GrantRecommendation {
  funderName: string;
  grantName: string;
  description: string;
  website: string;
  matchReason: string;
}

export type AppView = 'DASHBOARD' | 'PROFILE' | 'FINDER' | 'PROJECT';
