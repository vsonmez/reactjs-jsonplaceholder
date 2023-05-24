import React, { useMemo } from "react";
import turkishTitleCase from "../herlpers/turkish-title-case.helper";

const UpperCase = ({
  value,
  isLanguageTR,
  isOnlyFirstLetter,
  isTitleCase,
}: {
  value: string;
  isTitleCase?: boolean;
  isLanguageTR?: boolean;
  isOnlyFirstLetter?: boolean;
}) => {
  const sentenceArray = useMemo(() => value?.toLowerCase().split(" "), [value]);

  const upperCaseToFirstLetter = useMemo(() => {
    const firstWord = sentenceArray && sentenceArray[0];

    const upperCaseFirstWord = isLanguageTR
      ? turkishTitleCase(firstWord)
      : firstWord?.charAt(0).toUpperCase();

    const restOfSentences = sentenceArray?.slice(1).join(" ");

    return `${upperCaseFirstWord} ${restOfSentences}`;
  }, [isLanguageTR, sentenceArray]);

  const titleCase = useMemo(() => {
    if (isTitleCase) {
      if (isLanguageTR) {
        return turkishTitleCase(value);
      }
      const TitleCaseSentenceArray = sentenceArray?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return TitleCaseSentenceArray?.join(" ");
    }
  }, [isTitleCase, isLanguageTR, sentenceArray, value]);

  const text = useMemo(() => {
    if (isOnlyFirstLetter) {
      return upperCaseToFirstLetter;
    }
    if (isTitleCase) {
      return titleCase;
    }
    return String(value).toLocaleUpperCase();
  }, [
    isOnlyFirstLetter,
    isTitleCase,
    titleCase,
    upperCaseToFirstLetter,
    value,
  ]);

  return <>{text}</>;
};

export default React.memo(UpperCase);
