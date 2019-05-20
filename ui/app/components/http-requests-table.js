import Component from '@ember/component';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';

/**
 * @module HttpRequestsTable
 * HttpRequestsTable components render a table with the total number of HTTP Requests to a Vault server per month.
 *
 * @example
 * ```js
 * const COUNTERS = [
 *    {
 *       "start_time": "2019-05-01T00:00:00Z",
 *       "total": 50
 *     }
 * ]
 *
 * <HttpRequestsTable @counters={{COUNTERS}} />
 * ```
 *
 * @param counters {Array} - A list of objects containing the total number of HTTP Requests for each month. `counters` should be the response from the `/internal/counters/requests` endpoint.
 */

export default Component.extend({
  classNames: ['http-requests-table'],
  counters: null,
  countersWithChange: computed('counters', function() {
    let counters = this.counters || [];
    let countersWithPercentChange = [];
    let previousMonthVal;

    counters.forEach(month => {
      if (previousMonthVal) {
        const percentChange = (((month.total - previousMonthVal) / month.total) * 100).toFixed(1);
        let glyph;
        if (percentChange > 0) {
          glyph = 'arrow-up';
        } else if (percentChange < 0) {
          glyph = 'arrow-down';
        }
        const newCounter = assign({ percentChange, glyph }, month);
        countersWithPercentChange.push(newCounter);
      } else {
        // we're looking at the first counter in the list, so there is no % change value.
        countersWithPercentChange.push(month);
        previousMonthVal = month.total;
      }
    });
    return countersWithPercentChange;
  }),
});
