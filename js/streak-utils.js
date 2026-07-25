/**
 * streak-utils.js
 * Shared streak-calculation logic used by Goal Planner and Coding Practice.
 * Both pages store their own data under different localStorage keys, but
 * once you have a Set/array of ISO date strings ("YYYY-MM-DD") representing
 * "days something was completed," the streak math is identical — so it
 * lives here once instead of being copy-pasted per page.
 */

/**
 * Returns a local "YYYY-MM-DD" string for a given Date (defaults to now).
 * Deliberately avoids toISOString(), which converts to UTC and can shift
 * the date backward by a day for any timezone ahead of UTC (e.g. IST,
 * UTC+5:30) — that mismatch was causing streaks to always read as 0.
 */
function toLocalDateStr(date){
  const d = date || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayStr(){
  return toLocalDateStr(new Date());
}

/**
 * Calculates a consecutive-day streak from a collection of ISO date strings.
 * @param {Iterable<string>} dates - ISO date strings ("YYYY-MM-DD") for days with activity.
 * @returns {number} the current streak length.
 *
 * Behavior: if today isn't in the set yet, we still count backward from
 * yesterday so an in-progress day doesn't zero out an active streak.
 * The moment a gap day is hit, counting stops.
 */
function calcStreak(dates){
  const dateSet = dates instanceof Set ? dates : new Set(dates);
  if(dateSet.size === 0) return 0;

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if(!dateSet.has(todayStr())){
    cursor.setDate(cursor.getDate() - 1);
  }

  while(true){
    const iso = toLocalDateStr(cursor);
    if(dateSet.has(iso)){
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Counts how many entries fall within the last N days (inclusive of today).
 * @param {Array<{date: string}>} entries - objects with a `date` field (ISO string).
 * @param {number} days - window size, e.g. 7 for "this week".
 */
function calcRecentCount(entries, days){
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0, 0, 0, 0);
  return entries.filter(e => new Date(e.date + 'T00:00:00') >= cutoff).length;
}
