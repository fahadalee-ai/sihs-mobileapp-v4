# SIH&S User app — requirements status

All flows below are simulated. Status **Demo only** means the screen exists with sample data and no live backend.

| Item | Status | Evidence |
| --- | --- | --- |
| A1 Remove "Open Horizons Institute" | Demo only | `public/preview.html` title is SIH&S |
| A2 Job detail and profile layout | Demo only | `src/routes/_app/requests/$id.tsx`, `src/routes/_app/profile.tsx` |
| A3 Fictional sample data and tag | Demo only | `src/lib/store.tsx`, `src/components/Marks.tsx` |
| A4 In-app Call, Text, Email | Demo only | `src/routes/_app/incident.tsx` |
| A5 Demo only badge | Demo only | `src/components/Marks.tsx` |
| B1 Sign in, remember me, biometrics, guest | Demo only | `src/routes/login.tsx` |
| B2 Accept invitation | Demo only | `src/routes/invite.tsx` |
| B3 Secure recovery | Demo only | `src/routes/forgot.tsx` |
| B4 Second factor | Demo only | `src/routes/two-factor.tsx` |
| B5 Session expired | Demo only | `src/routes/session.tsx` |
| B6 Security settings | Demo only | `src/routes/_app/v2.tsx` view `security` |
| B7 Skip and replay tutorial | Demo only | `src/routes/onboarding.tsx`, Help replay link |
| B8 Roles, sites, authority | Demo only | `src/routes/_app/profile.tsx` |
| B9 No access | Demo only | Job detail missing record and v2 `no-access` |
| B10 Guest verification gate | Demo only | Guest job detail masks the number and opens v2 `gate` |
| B11 Home actions | Demo only | `src/routes/_app/home.tsx` |
| C1 Service catalog | Demo only | `src/lib/content.ts` |
| C2 Delaware-only wording removed | Demo only | `src/lib/content.ts`, onboarding, location |
| C3 Eligible services and one ineligible card | Demo only | Home service list |
| C4 Service-specific questions | Demo only | `src/routes/_app/request.tsx` |
| C5 Towing limits and U-Haul lockout only | Demo only | Home search block, v2 `uhaul` |
| D1 Request steps, pin note, saved location | Demo only | `src/routes/_app/request.tsx` |
| D2 Drafts | Demo only | v2 `drafts` |
| D3 Required-field checks | Demo only | Review step lists missing callback, worksite, or towing authority |
| D4 Review with edit and preserved answers | Demo only | Request review step keeps component state |
| D5 Duplicate submit sample | Demo only | Submit disables, then v2 `duplicate` |
| D6 Office vs mobile appointment | Demo only | Request details selector and confirmation site line |
| D7 Not sure / need help | Demo only | Request location step links to Help |
| D8 Towing unknowns | Demo only | Towing keys, drivetrain, rolling, equipment, and payer include I don't know |
| D9 Service-specific wording | Demo only | Request `ServiceDetails` |
| D10 No MRO on DNA | Demo only | `src/lib/content.ts` |
| D11 Notary signature note | Demo only | Notary request step |
| D12 Supplies lines | Demo only | Supplies quantity, unit, and delivery lines |
| D13 Cleaning and lawn checklists | Demo only | Request areas field for cleaning and lawn |
| E1 Requests, bookings, assignments | Demo only | `src/routes/_app/bookings.tsx` |
| E2 Availability note | Demo only | v2 `reschedule` |
| E3 Recurring and multi-site visits | Demo only | v2 `contracts` |
| E4 Reschedule | Demo only | v2 `reschedule` |
| E5 Cancel | Demo only | Existing cancel sheet on bookings |
| E6 Outcome states | Demo only | v2 `outcomes` |
| F1 Milestone timeline | Demo only | Job detail |
| F2 Interrupted, canceled, unsuccessful | Demo only | v2 `outcomes` and job detail note |
| F3 Follow-on statuses | Demo only | Job detail status grid |
| F4 Live tracking states | Demo only | v2 `tracking` |
| F5 Tracking limits | Demo only | v2 `tracking` |
| F6 Multi-stop and restricted passengers | Demo only | Request transport copy |
| F7 Update source | Demo only | Job detail "Update details" |
| G1 Released proof | Demo only | Job detail photos |
| G2 Cleaning, supplies, notary proof views | Needs SIH&S input | Described on service screens, not a separate proof layout per service |
| G3 Courier handoffs | Needs SIH&S input | Medical courier package ID is present; full custody timeline is not |
| G4 Satisfaction sign-off | Demo only | v2 `signoff` |
| G5 Missing signature and dispute | Demo only | v2 `signoff` |
| G6 Report a problem | Demo only | v2 `issues` |
| G7 Four distinct statuses | Demo only | Job detail |
| H1 Incident file | Demo only | v2 `incident-file` |
| H2 Evidence and audio off | Demo only | v2 `incident-file` |
| H3 Facts vs opinions | Demo only | v2 `incident-file` |
| H4 Before-movement and safety exception | Demo only | v2 `incident-file` |
| H5 Interim vs complete and integrity note | Demo only | v2 `records` |
| H6 Correction history | Demo only | v2 `records` |
| H7 Released records and renewal block | Demo only | v2 `records` |
| H8 PIM-VEE and patent language | Demo only | `src/lib/content.ts` |
| I1 Contracts and sites | Demo only | v2 `contracts` |
| I2 Contract detail | Demo only | v2 `contracts` |
| I3 Visit does not close the contract | Demo only | v2 `contracts` |
| I4 Government fields only for contract customers | Demo only | Purchase order field shows for linked organizations |
| J1 Quote | Demo only | v2 `quotes` |
| J2 Booked, deposit, dispatch are separate | Demo only | v2 `quotes` |
| J3 Square, no card numbers | Demo only | v2 `payments`, deposit screen |
| J4 Payment verification labels | Demo only | v2 `payments` |
| J5 Payment history states | Demo only | v2 `payments` |
| J6 Invoices and duplicate prevention | Demo only | v2 `invoices` |
| J7 Customer quantities separate from crew hours | Demo only | v2 `invoices` |
| K1 Testing visit reference only | Demo only | v2 `testing` and request DNA step |
| K2 Testing uploads and free text disabled | Demo only | Restricted media slugs and DNA form |
| K3 No participant names in notices | Demo only | v2 `testing` |
| K4 Coded billing lines | Demo only | v2 `testing` note |
| K5 Testing privacy notices | Demo only | v2 `testing` |
| K6 Medical courier package ID | Demo only | v2 `courier` |
| L1 Job messages | Demo only | v2 `messages` |
| L2 Help explains phone apps vs in-app messages | Demo only | Help screen |
| L3 SMS checkbox optional and unchecked | Demo only | `src/routes/signup.tsx`, v2 `sms` |
| L4 Accepted versions | Demo only | v2 `legal` |
| L5 Offline queue | Demo only | v2 `offline` and existing offline banner |
| L6 Uploaded vs archived | Demo only | v2 `offline` |
| L7 Lost device | Demo only | v2 `security` |
