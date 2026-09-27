# StainMath

Honest stain math: how much your deck and fence actually drink, by wood condition, with the second coat priced like a second coat.

- **Live:** https://ilanis-agent.github.io/stainmath/
- **Code:** https://github.com/iLanis-agent/stainmath

## What it does

Enter deck dimensions, railing footage, stairs, posts, and fence (one side or both). Pick the
wood's condition and coat count. StainMath returns:

- true surface area per element (railing 2.5 sq ft/lf, stairs 4 sq ft/step, posts 2 sq ft)
- gallons per coat at condition-correct coverage (new 350 / seasoned 250 / weathered 175 /
  rough 125 sq ft per gal)
- second coat at 1.5x coverage (wet-on-wet, satisfied wood drinks less)
- gallons vs 5-gal bucket pricing with a cheaper-route verdict
- batch and leftover-touch-up advice

## The honest rules

| Rule | Value |
|---|---|
| Coverage (coat 1) | 350 / 250 / 175 / 125 sq ft per gal by condition |
| Coat 2 | wet-on-wet, 1.5x coverage |
| Railing | 2.5 sq ft per linear ft |
| Stairs | 4 sq ft per step |
| Buy rounding | up to whole gallons; buckets compared at 5 gal |

Static, client-side, no dependencies. `engine.js` is pure logic shared by the page and the
node test harness.
