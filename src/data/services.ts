// The six compound. services. Every service page is built from this file,
// so the node > bond > block structure stays identical across pages.

export type Stage = 'node' | 'bond' | 'block';

export interface Service {
  slug: string;
  symbol: string;
  no: string;
  name: string;
  short: string;          // name used on tiles and in the service map
  promise: string;
  forWho: string;
  summary: string;        // one line for tiles and the services hub
  node: { lead: string; items: string[] };
  bond: { lead: string; items: string[] };
  block: { lead: string; items: string[]; kpis: string[] };
  tools: string;          // which diagnostic tools sit behind it
  cta: string;
}

export const services: Service[] = [
  {
    slug: 'business-assessment',
    symbol: 'Ba',
    no: '01',
    name: 'Business assessment',
    short: 'Business assessment',
    promise: 'See your business the way an outsider does, in two weeks.',
    forWho: 'Founders and leadership teams who know growth has stalled but can’t pin down why.',
    summary: 'Find the leaks, size them, and agree what to fix first.',
    node: {
      lead: 'We start with the people and the data, on their own terms.',
      items: [
        'Short interviews with leadership and the front line, so every number has an owner',
        'A health check on your Shopify, GA4, ad platform and cost data, so we know what to trust',
        '18–24 months of trading, customer and product data',
        'Your customer journey, end to end',
      ],
    },
    bond: {
      lead: 'Then we connect what nobody has had time to connect.',
      items: [
        'Margin joined to marketing spend, so you see what a customer really costs and earns',
        'Customer cohorts joined to products and channels, so you see who comes back and why',
        'A findings workshop where the people who own each number agree on what it means',
      ],
    },
    block: {
      lead: 'You leave with blocks to build, not a deck to file.',
      items: [
        'A growth assessment: the biggest leaks and quick wins, each sized in £',
        'A block register: every action with an owner, a date and a KPI',
        'A 90-day plan in the order that pays back fastest',
      ],
      kpis: ['Opportunities sized in £', 'Data trust score', 'Actions with owners'],
    },
    tools: 'People and ownership, data health check, diagnostic scorecard',
    cta: 'Book a growth assessment',
  },
  {
    slug: 'growth-strategy',
    symbol: 'Gs',
    no: '02',
    name: 'Growth strategy',
    short: 'Growth strategy',
    promise: 'A plan for the next phase that every team can act on.',
    forWho: 'Brands moving into D2C, scaling past the start-up phase, or entering the US and Europe.',
    summary: 'One plan for the next phase, with levers you can model.',
    node: {
      lead: 'We start with where you are and where you want to be.',
      items: [
        'Your market, customers, channels and margins',
        'Your ambitions: D2C launch, new markets, new ranges',
        'What your leadership and teams believe is holding you back',
      ],
    },
    bond: {
      lead: 'We bring commercial, marketing, ecommerce and operations into one plan.',
      items: [
        'Strategy sessions that end in decisions, not more questions',
        'A forecast built from your real drivers, so every idea has a number',
        '“What if we fix this?” scenarios, so you can see which levers matter most',
      ],
    },
    block: {
      lead: 'You get a strategy people can deliver.',
      items: [
        'Target customers, channel mix, proposition and pricing',
        'A market-entry plan where you need one',
        'A roadmap where every step has an owner, a date and a KPI',
      ],
      kpis: ['Revenue and contribution forecast', 'Target CAC', 'Market entry milestones'],
    },
    tools: 'Marketing efficiency, forecast and scenarios',
    cta: 'Talk about your next phase',
  },
  {
    slug: 'conversion',
    symbol: 'Cr',
    no: '03',
    name: 'Conversion',
    short: 'Conversion',
    promise: 'Turn more of the traffic you already pay for into customers.',
    forWho: 'D2C brands with healthy traffic and a conversion rate that won’t move.',
    summary: 'Find where shoppers drop out, then test your way to more orders.',
    node: {
      lead: 'We start where your shoppers are.',
      items: [
        'Funnel data from product page to purchase, by device',
        'Session recordings, on-site search and customer research',
        'Your merchandising, delivery promise and checkout',
      ],
    },
    bond: {
      lead: 'We connect ecommerce, marketing, trading and your developers.',
      items: [
        'Drop-off joined to what customers say, so you know why they leave',
        'One prioritised test backlog everyone works from',
        'A weekly test-and-learn rhythm with your team or agency',
      ],
    },
    block: {
      lead: 'We ship improvements and measure them.',
      items: [
        'Changes live on site, tested and measured',
        'A learning log so every result makes the next test smarter',
        'Uplift you can see in revenue, not just in a testing tool',
      ],
      kpis: ['Conversion rate', 'Average order value', 'Revenue per visitor'],
    },
    tools: 'Funnel and CRO, test and learn tracker',
    cta: 'Find where your conversion is leaking',
  },
  {
    slug: 'customer-retention',
    symbol: 'Cu',
    no: '04',
    name: 'Customer retention & development',
    short: 'Customer retention',
    promise: 'Understand your customers, keep them longer and grow what they’re worth.',
    forWho: 'Any brand that wants more from the customers it already has. That’s almost every brand.',
    summary: 'Know who’s worth keeping, why they leave, and how to bring them back.',
    node: {
      lead: 'We start with your customers and the teams who serve them.',
      items: [
        'Orders, repeat purchases and subscriptions',
        'Reviews, service tickets, return reasons and surveys',
        'Your CRM, email and customer service teams',
      ],
    },
    bond: {
      lead: 'We connect what customers do with what they say.',
      items: [
        'Cohorts and lifetime value, so you know which customers are worth most',
        'Customer voice joined to orders, so you know why they stay or leave',
        'True margin per customer, so you know what you can spend to keep them',
      ],
    },
    block: {
      lead: 'We build the journeys and fixes that keep customers coming back.',
      items: [
        'Welcome, second-purchase and win-back journeys',
        'Loyalty or subscription design where it pays',
        'Service fixes and plans for your most valuable customers',
      ],
      kpis: ['Repeat rate', '12-month lifetime value', 'Churn'],
    },
    tools: 'Cohorts and LTV, customer voice, retention flows',
    cta: 'Find out what your customers are worth',
  },
  {
    slug: 'operations-and-analytics',
    symbol: 'Op',
    no: '05',
    name: 'Operations & analytics',
    short: 'Operations & analytics',
    promise: 'Systems, data and processes that keep up with your growth.',
    forWho: 'Growing brands whose stock, fulfilment or reporting can’t keep up.',
    summary: 'True margins, clean data and weekly routines that run themselves.',
    node: {
      lead: 'We start with how the business actually runs.',
      items: [
        'Fulfilment, stock, returns and customer service',
        'Your tech stack, tracking and reporting',
        'Product costs, shipping, fees and promotions',
      ],
    },
    bond: {
      lead: 'We put every team on the same numbers.',
      items: [
        'Margin by order, product and channel, after every cost',
        'Range analysis: heroes, dead stock and margin traps',
        'A weekly trading pack and meeting that connects the warehouse, marketing and leadership',
      ],
    },
    block: {
      lead: 'We build the routines that keep you in control.',
      items: [
        'Process fixes that cut cost and speed up delivery',
        'A measurement framework and dashboards people use',
        'A promotions plan that makes money rather than giving margin away',
      ],
      kpis: ['Contribution margin', 'Cost to serve', 'Return rate'],
    },
    tools: 'Unit economics, range and inventory, trading pack, promo planner',
    cta: 'See your true margins',
  },
  {
    slug: 'fractional-leadership',
    symbol: 'Fl',
    no: '06',
    name: 'Fractional leadership',
    short: 'Fractional leadership',
    promise: 'Senior leadership, without the full-time hire.',
    forWho: 'Businesses missing a commercial, ecommerce, marketing or customer lead.',
    summary: 'An experienced leader in your team, two or three days a week.',
    node: {
      lead: 'We start with the gap and the team around it.',
      items: [
        'The role you need: commercial, ecommerce, marketing or customer',
        'The team that needs leading and the plan that needs owning',
      ],
    },
    bond: {
      lead: 'We work inside your business, connecting the board to the front line.',
      items: [
        'Two or three days a week, in your meetings and your tools',
        'Running the weekly trading routine and the block register',
      ],
    },
    block: {
      lead: 'We leave things stronger than we found them.',
      items: [
        'A team that’s led and a plan that’s delivered',
        'A smooth handover to a permanent hire when you’re ready',
      ],
      kpis: ['Plan delivered on time', 'Team capability', 'Handover readiness'],
    },
    tools: 'Owns the block register and the trading pack',
    cta: 'Talk about a fractional role',
  },
];

export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

// The 14 cross-bonds. Each makes both blocks stronger.
export const bonds: { a: string; b: string; why: string }[] = [
  { a: 'business-assessment', b: 'growth-strategy', why: 'The assessment’s findings become the strategy’s starting point.' },
  { a: 'business-assessment', b: 'conversion', why: 'Quick wins found in the assessment become the first tests.' },
  { a: 'business-assessment', b: 'customer-retention', why: 'Cohort and customer voice findings show who to keep and why they leave.' },
  { a: 'business-assessment', b: 'operations-and-analytics', why: 'The assessment shows where data and processes are missing.' },
  { a: 'growth-strategy', b: 'conversion', why: 'The strategy decides which journeys matter; conversion proves them on site.' },
  { a: 'growth-strategy', b: 'customer-retention', why: 'Lifetime value sets what the plan can spend to win a customer.' },
  { a: 'growth-strategy', b: 'operations-and-analytics', why: 'Measurement makes the plan trackable; operations makes it deliverable.' },
  { a: 'growth-strategy', b: 'fractional-leadership', why: 'A senior leader owns the plan and sees it through.' },
  { a: 'conversion', b: 'customer-retention', why: 'A better first purchase lifts repeat rate.' },
  { a: 'conversion', b: 'operations-and-analytics', why: 'Tests need clean measurement, and checkout promises must be kept.' },
  { a: 'conversion', b: 'fractional-leadership', why: 'The leader drives the test roadmap across teams and agencies.' },
  { a: 'customer-retention', b: 'operations-and-analytics', why: 'Delivery, returns and service decide whether customers come back.' },
  { a: 'customer-retention', b: 'fractional-leadership', why: 'A commercial or customer lead owns the retention plan.' },
  { a: 'operations-and-analytics', b: 'fractional-leadership', why: 'The leader embeds the dashboards and weekly routines.' },
];

export function bondsFor(slug: string) {
  return bonds
    .filter((x) => x.a === slug || x.b === slug)
    .map((x) => ({ other: bySlug[x.a === slug ? x.b : x.a], why: x.why }));
}
