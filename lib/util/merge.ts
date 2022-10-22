import mergeWith from "lodash/mergeWith";
import { DeeplyPartial } from "./types";

export interface MergeOptions {
  /** Default is 'overwrite' */
  arrayResolution?: "overwrite" | "concat" | "merge";
  mutate?: boolean;
}

/** @todo document and test */
export const merge = <T>(
  target: T,
  source: DeeplyPartial<T>,
  options?: MergeOptions
): T =>
  mergeWith(
    ...((options?.mutate ? [target, source] : [{}, target, source]) as [
      any,
      any,
      any
    ]),
    (targetValue: any, sourceValue: any) => {
      const isSourceArray = Array.isArray(sourceValue);
      const isTargetArray = Array.isArray(targetValue);
      if (isSourceArray || isTargetArray) {
        switch (options?.arrayResolution || "overwrite") {
          case "overwrite":
            return sourceValue;
          case "concat":
            if (!isTargetArray) {
              return [targetValue].concat(sourceValue);
            }
            return targetValue.concat(sourceValue);
          case "merge":
            if (!isTargetArray) {
              return sourceValue;
            }
            if (!isSourceArray) {
              return targetValue;
            }
            return merge(sourceValue, targetValue, options);
        }
      }
    }
  ) as any;
