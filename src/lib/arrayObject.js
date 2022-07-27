import { get } from "lodash";

export const getIndex = (arr = [], value, key = "id", ignoreCase = false) => {
  let index = -1;
  for (let i = 0; i < arr?.length; i++) {
    const element = arr[i];
    if (ignoreCase) {
      if (
        String(get(element, key)).toLowerCase() === String(value).toLowerCase()
      ) {
        index = i;
      }
    } else {
      if (String(get(element, key)) === String(value)) {
        index = i;
      }
    }
  }
  return index;
};

export const getObjectItem = (data = {}, selector = "") => {
  const type = typeof selector;
  if (type === "string") return data?.[selector];
  if (type === "function") return selector(data);
  return null;
};

export const formatArray = (data) => (Array.isArray(data) ? data : []);

export const convertId2String = (data = []) =>
  (data ?? []).map((item = {}) => ({
    ...(item ?? {}),
    id: String(item?.id ?? ""),
  }));

export const loopSelf = (
  data = [],
  onEach = () => {},
  onFinish = () => {},
  current = 0
) => {
  if (current < data?.length) {
    onEach(
      // next
      () => {
        loopSelf(data, onEach, onFinish, current + 1);
      },
      // current item
      data?.[current],
      // current index
      current,
      // self
      data
    );
  } else {
    onFinish();
  }
};
