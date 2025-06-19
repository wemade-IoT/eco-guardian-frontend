import type { PlanType } from "../types/plan-selected";

export function getPlanId(planType: PlanType): number {
  const planIdMap: Record<PlanType, number> = {
    'DOMESTIC': 2,
    'PRO': 2,
    'ENTERPRISE': 3
  };

  return planIdMap[planType];
}