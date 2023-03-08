import { Stripe } from "stripe";

const stripeConfig = new Stripe(
  'sk_test_51MSJjiEe8AR9e9n8nC8xfJgFte1Sulc5y4VDkL3idSTYcDG1B21KlzeiZeKo6wENdRPDqEHs65wuon1sbzgDAVDT00iMmM0w4I' ||
  '',
  {
    apiVersion: '2022-11-15',
  }
)

export default stripeConfig;