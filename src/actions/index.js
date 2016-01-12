/**
 * Created by liekkas on 15/12/17.
 */

export function createAction(type, payload = '', meta = '') {
  return {
    type,
    payload,
    meta,
  };
}
