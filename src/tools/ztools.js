/**
 * Created by liekkas on 15/12/24.
 */
import _ from 'lodash';

export function createUniqueId(mark) {
  return _.uniqueId(new Date().getMilliseconds() + mark);
}
