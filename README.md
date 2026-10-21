# Sustainable IQ website (static draft)

A responsive, three-page, zero-build static marketing site for Sustainable IQ. This is **a preview/draft**, not a deployed public website.

## Open it

Open `index.html` in a web browser to explore the Home, Advisory Services and Market Booth pages. To test through a local server, run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/`.

## Pages and assets

- `index.html`: mission, two expressions of SIQ, why it matters and contact section.
- `services.html`: scoped consulting capabilities, industries, process and service boundaries.
- `booth.html`: upcoming Rogers market booth, illustrative categories, category filters and physical-location information.
- `content.md`: master copy and marketing source file, provenance, caveats and publishing checklist.
- `assets/`: all CSS, JavaScript, SVG identity artwork and locally hosted WebP illustrative imagery.

## Crucial setup before publishing

**Email/contact:** `assets/site-config.js` deliberately has an empty `contactEmail`. Enter a confirmed business contact email to make the contact link active. The site has no backend and does not accept contact submissions. No live lead capture was claimed or simulated.

**Inventory and hours:** Booth location is confirmed as 1305 W. Walnut Street, Rogers, AR, with 10 × 10 ft space and preopening status. Confirm actual opening date, hours and booth number before launch.

**Images:** All decorative imagery is illustrative concept art cropped from original AI-generated design studies. It does not depict actual stocked goods or the real finished booth. Replace with real photography when available.

**Claims:** Services follow SIQ's current `my_career` strategy documents but are not a guarantee of availability. Client names, private household strategy, revenues, internal pricing, and personal details were intentionally withheld. Review service language for professional and legal accuracy before publishing.

## Deployment

Upload **all** files, retaining relative directories, to any static host such as GitHub Pages, Netlify or standard web hosting. There are no dependencies, external fonts, trackers, cookies, form submissions or server APIs. All links between pages and local assets use relative URLs.

## Maintenance

Edit `content.md` as the marketing source. Update matching HTML sections when copy changes. Keep product availability truthful and continue labeling examples until verified. The base layout and filtering use vanilla JavaScript in `assets/site.js`.
