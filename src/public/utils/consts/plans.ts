import type { PlanType } from "../types/plan-selected"

export interface PlanProps {
  title: string,
  type: PlanType,
  price: number | string
  description: string
  features: string[],
  isPopular: boolean,
}

export const plans: PlanProps[] = [
  {
    title: 'Domestic Plan',
    type: 'DOMESTIC',
    price: 5,
    description: 'Basic features suitable for individuals or small users.',
    features: [
      'Access to essential features',
      'Basic support',
      'Ideal for personal use'
    ],
    isPopular: false
  },
  {
    title: 'Domestic Pro Plan',
    type: 'PRO',
    price: 50,
    description: 'Expanded features offering more capabilities for growing needs.',
    features: [
      'All features of the Domestic Plan',
      'Advanced tools',
      'Priority support',
      'Increased storage capacity'
    ],
    isPopular: true
  },
  {
    title: 'Enterprise Plan',
    type: 'ENTERPRISE',
    price: 200,
    description: 'Comprehensive features designed for large-scale operations with advanced requirements.',
    features: [
      'All features of the Pro Plan',
      'Customized solutions',
      '24/7 dedicated support',
      'Advanced integrations',
      'Maximum security and compliance'
    ],
    isPopular: false
  }
];