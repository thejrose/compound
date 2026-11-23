// Routes, titles and descriptions for each page built from the canvas.
export const SITE = 'https://compoundconsultancy.com';
export const GA_ID = 'G-E6NLDBYN60'; // Google Analytics 4 (loads only after cookie consent)

// canvas file name (desktop) → URL
export const ROUTE = {
  Main: '/',
  Services: '/services/',
  'Service-Ba': '/services/business-assessment/',
  'Service-Gs': '/services/growth-strategy/',
  'Service-Cr': '/services/conversion/',
  Service: '/services/customer-retention/',
  'Service-Op': '/services/reporting-analytics/',
  'Service-Fl': '/services/fractional-leadership/',
  Approach: '/approach/',
  About: '/about/',
  Book: '/growth-check/',
  Thanks: '/thanks/',
};

export const PAGES = [
  { file: 'Main', path: '/', title: 'compound. · Ecommerce growth consultancy for D2C brands', description: 'Senior ecommerce leadership for growing D2C brands. We find where growth is leaking, size every fix in pounds and work with your team until it’s delivered.' },
  { file: 'Services', path: '/services/', title: 'Services · compound.', description: 'Six connected services for growing D2C brands: business assessment, growth strategy, conversion, customer retention, reporting & analytics and fractional leadership.' },
  { file: 'Service-Ba', path: '/services/business-assessment/', title: 'Business assessment · compound.', description: 'An objective view across your whole business: we connect the dots between every team, validate the ideas against the data and size the opportunities.' },
  { file: 'Service-Gs', path: '/services/growth-strategy/', title: 'Growth strategy · compound.', description: 'Identify where your growth will come from, build the plan to get there, and model the levers before you commit.' },
  { file: 'Service-Cr', path: '/services/conversion/', title: 'Conversion · compound.', description: 'A goal-led strategy to convert more of the traffic you already have, prioritising the changes that move your goals.' },
  { file: 'Service', path: '/services/customer-retention/', title: 'Customer retention · compound.', description: 'Understand who’s worth keeping, why they leave and how to bring them back. Repeat customers cost less to serve and spend more.' },
  { file: 'Service-Op', path: '/services/reporting-analytics/', title: 'Reporting & analytics · compound.', description: 'One trusted set of numbers, true product margins and a simple weekly trading rhythm, so every team decides faster from the same data.' },
  { file: 'Service-Fl', path: '/services/fractional-leadership/', title: 'Fractional leadership · compound.', description: 'Senior ecommerce leadership without the full-time hire: one owner who connects the teams, keeps everyone on one goal and drives delivery.' },
  { file: 'Approach', path: '/approach/', title: 'Our approach · compound.', description: 'Understand. Connect. Build. How compound. works with growing D2C brands, from the first conversation to changes that last.' },
  { file: 'About', path: '/about/', title: 'About · compound.', description: 'compound. is an ecommerce growth consultancy for growing D2C brands, founded by James Rose.' },
  { file: 'Book', path: '/growth-check/', title: 'Request a growth check · compound.', description: 'A free 30-minute call about the challenges you’re facing, followed by a short written summary.' },
  { file: 'Thanks', path: '/thanks/', title: 'Thank you · compound.', description: 'Thanks for requesting a growth check. We’ll be in touch within one working day.', noindex: true },
];

const legalSection = (title, updated, bodyHtml) => (mobile) => `<section style="padding: ${mobile ? '48px 0 64px' : '112px 0 128px'};">
    <div style="max-width: 760px; margin: 0 auto; padding: 0 ${mobile ? '20px' : '24px'}; display: flex; flex-direction: column; gap: 20px;">
      <span style="font: 500 12.5px/1 'IBM Plex Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #4F5869;">Last updated ${updated}</span>
      <h1 style="margin: 0 0 8px; font-family: Fraunces, Georgia, serif; font-weight: 400; font-size: ${mobile ? '38px' : '56px'}; line-height: 1.05; letter-spacing: -0.025em;">${title}<span style="color: #C76A10;">.</span></h1>
      <div style="display: flex; flex-direction: column; gap: 14px; font-size: ${mobile ? '16px' : '17px'}; color: #4F5869;">${bodyHtml
        .replace(/<h2>/g, '<h2 style="margin: 20px 0 0; font: 400 24px/1.25 Fraunces, Georgia, serif; color: #172033;">')
        .replace(/<p>/g, '<p style="margin: 0;">')
        .replace(/<ul>/g, '<ul style="margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px;">')}</div>
    </div>
  </section>`;

export const LEGAL = [
  { path: '/privacy/', title: 'Privacy notice · compound.', description: 'How compound. collects and uses personal data.', body: legalSection('Privacy notice', '[DATE]', `
    <p>This notice explains how [LEGAL COMPANY NAME] (“compound.”, “we”), company number [COMPANY NUMBER], registered at [ADDRESS], uses personal data when you visit this website or contact us. We are the data controller.</p>
    <h2>What we collect</h2>
    <ul><li>Details you send us through the growth check form: your name, work email, website, revenue range, role, the services you’re interested in and your message.</li><li>Basic technical data our host needs to run the site securely, such as IP addresses in server logs.</li><li>If you accept analytics cookies, information about how you use the site, collected by Google Analytics (see our <a href="/cookies/">cookie policy</a>).</li></ul>
    <h2>Why we use it</h2>
    <ul><li>To reply to your enquiry and arrange a call (our legitimate interest in responding to you).</li><li>To deliver services if you become a client (to perform our contract).</li><li>To understand how the website is used and improve it, only with your consent.</li></ul>
    <h2>Who we share it with</h2>
    <p>Our website host and form provider (Netlify), Google (for analytics, only if you accept) and our email provider [PROVIDER]. They process data on our instructions. Some may store data outside the UK under approved safeguards.</p>
    <h2>Client data in our work</h2>
    <p>When we analyse a client’s business data, we work under a data processing agreement with that client. Customer data is pseudonymised before analysis and deleted or returned when the engagement ends.</p>
    <h2>How long we keep it</h2>
    <p>Enquiries we don’t take forward are deleted after 12 months. Client records are kept for 6 years for legal and accounting reasons.</p>
    <h2>Your rights</h2>
    <p>You can ask to see, correct or delete your data, or object to how we use it, by emailing [HELLO@DOMAIN]. You can also complain to the Information Commissioner’s Office at ico.org.uk.</p>`) },
  { path: '/cookies/', title: 'Cookie policy · compound.', description: 'The cookies compound. uses and how to control them.', body: legalSection('Cookie policy', '[DATE]', `
    <p>We use as few cookies as possible, and we only set analytics cookies if you say yes.</p>
    <h2>Strictly necessary</h2>
    <p>Our host (Netlify) may use technical storage to run the site and protect the growth check form from spam. We also remember your cookie choice in your browser, so we don’t ask again on every page. These don’t need your consent.</p>
    <h2>Analytics (only with your consent)</h2>
    <p>If you accept, we use Google Analytics 4 to understand which pages are useful and how people find us. It sets cookies named <code>_ga</code> and <code>_ga_*</code>, which last up to 2 years. Google processes this data on our behalf, and IP addresses are not stored. We don’t use advertising or remarketing cookies.</p>
    <h2>Changing your mind</h2>
    <p>You can change your choice at any time. If you withdraw consent, we stop loading Google Analytics and remove its cookies from this site.</p>
    <p><button type="button" data-cookie-settings style="min-height: 44px; padding: 12px 22px; border-radius: 999px; border: 1px solid #172033; background: #172033; color: #FFFFFF; font: 600 15px/1 'Instrument Sans', Arial, sans-serif; cursor: pointer;">Change cookie settings</button></p>`) },
  { path: '/terms/', title: 'Website terms · compound.', description: 'Terms of use for the compound. website.', body: legalSection('Website terms', '[DATE]', `
    <p>This website is run by [LEGAL COMPANY NAME], company number [COMPANY NUMBER], registered at [ADDRESS]. By using it you accept these terms.</p>
    <h2>Using the site</h2>
    <p>The content is for general information. It isn’t advice for your business; for that, talk to us.</p>
    <h2>Intellectual property</h2>
    <p>The compound. name, logo, the nodes, bonds and blocks system, and the content on this site belong to us. Please don’t copy them without permission.</p>
    <h2>Links</h2>
    <p>We aren’t responsible for the content of sites we link to.</p>
    <h2>Liability</h2>
    <p>We don’t exclude liability where the law doesn’t allow it. Otherwise, we aren’t liable for loss arising from use of this website.</p>
    <h2>Law</h2>
    <p>These terms are governed by the law of England and Wales.</p>`) },
];

export const NOT_FOUND = {
  path: '/404', title: 'Page not found · compound.', description: 'This page doesn’t exist.', noindex: true,
  body: (mobile) => `<section style="padding: ${mobile ? '64px 0 72px' : '128px 0 136px'};">
    <div style="max-width: 760px; margin: 0 auto; padding: 0 ${mobile ? '20px' : '24px'}; display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center;">
      <span style="font: 500 12.5px/1 'IBM Plex Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #4F5869;">404</span>
      <h1 style="margin: 0; font-family: Fraunces, Georgia, serif; font-weight: 400; font-size: ${mobile ? '38px' : '64px'}; line-height: 1.04; letter-spacing: -0.025em;">This bond didn’t form<span style="color: #C76A10;">.</span></h1>
      <p style="margin: 0; font-size: ${mobile ? '17px' : '20px'}; color: #4F5869;">The page you’re looking for isn’t here. Try the services, or start with a conversation.</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;"><a class="cp-press" href="/growth-check/" style="background: #172033; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 15.5px; padding: 16px 24px; border-radius: 999px;">Request a growth check <span class="cp-arrow" aria-hidden="true">→</span></a><a class="cp-press" href="/services/" style="background: #FFFFFF; color: #172033; text-decoration: none; font-weight: 600; font-size: 15.5px; padding: 16px 24px; border-radius: 999px; border: 1px solid #C9D0DC;">See the services</a></div>
    </div>
  </section>`,
};
