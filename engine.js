// StainMath engine - honest deck/fence stain ordering math.
// Pure logic, no DOM. Shared by app.html and the node test harness.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.StainMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var COVERAGE = { newwood: 350, seasoned: 250, weathered: 175, rough: 125 }; // sqft per gallon, coat 1
  var SECOND_COAT_MULT = 1.5;   // satisfied wood drinks less: coat 2 covers 1.5x
  var RAILING_SQFT_PER_LF = 2.5; // rails + balusters, both faces
  var STAIR_SQFT = 4;            // tread + riser + stringer per step
  var POST_SQFT = 2;             // 4x4 post, 4 ft exposed

  function round2(x) { return Math.round(x * 100) / 100; }

  function plan(opts) {
    var deckSqFt = round2((opts.deckLengthFt || 0) * (opts.deckWidthFt || 0));
    var railingSqFt = round2((opts.railingLf || 0) * RAILING_SQFT_PER_LF);
    var stairsSqFt = round2((opts.stairs || 0) * STAIR_SQFT);
    var fenceSqFt = round2((opts.fenceLf || 0) * (opts.fenceHeightFt || 0) * (opts.fenceSides || 1));
    var postsSqFt = round2((opts.posts || 0) * POST_SQFT);
    var area = round2(deckSqFt + railingSqFt + stairsSqFt + fenceSqFt + postsSqFt);
    var cov = COVERAGE[opts.condition];
    var gal1 = round2(area / cov);
    var gal2 = opts.coats === 2 ? round2(area / (cov * SECOND_COAT_MULT)) : 0;
    var totalGal = round2(gal1 + gal2);
    var buyGal = Math.ceil(totalGal);
    var galCost = round2(buyGal * (opts.pricePerGal || 0));
    var buckets = Math.ceil(totalGal / 5);
    var bucketCost = round2(buckets * (opts.pricePer5Gal || 0));
    var cheaper = (opts.pricePerGal > 0 && opts.pricePer5Gal > 0 && totalGal > 2)
      ? (bucketCost < galCost ? 'bucket' : 'gallons') : null;
    return {
      deckSqFt: deckSqFt,
      railingSqFt: railingSqFt,
      stairsSqFt: stairsSqFt,
      fenceSqFt: fenceSqFt,
      postsSqFt: postsSqFt,
      area: area,
      coverage: cov,
      gal1: gal1,
      gal2: gal2,
      totalGal: totalGal,
      buyGal: buyGal,
      galCost: galCost,
      buckets: buckets,
      bucketCost: bucketCost,
      cheaper: cheaper
    };
  }

  return { plan: plan, COVERAGE: COVERAGE, round2: round2 };
});
