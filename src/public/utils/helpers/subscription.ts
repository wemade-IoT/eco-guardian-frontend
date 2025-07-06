import type { PlanType } from "../types/plan-selected";

export function getPlanId(planType: PlanType): number {
  const planIdMap: Record<PlanType, number> = {
    'DOMESTIC': 2,
    'PRO': 2,
    'ENTERPRISE': 3
  };

  return planIdMap[planType];
}

export function getPlanName(subscriptionId: number): string {
  const planNameMap: Record<number, string> = {
    1: 'Domestic',
    2: 'Pro',
    3: 'Business',
    4: 'Specialist',
    5: 'Admin'
  };

  return planNameMap[subscriptionId];
}