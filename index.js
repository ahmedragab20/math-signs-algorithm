const db = {
  "+": "_PLUS_",
  "-": "_HYPHEN_MINUS_",
  "*": "_ASTERISK_",
  "/": "_SOLIDUS_",
  "%": "_PERCENT__SIGN_",
  "=": "_EQUALS__SIGN_",
  "(": "_LEFT_PARENTHESIS_",
  ")": "_RIGHT_PARENTHESIS_",
  "[": "_LEFT_SQUARE_BRACKET_",
  "]": "_RIGHT_SQUARE_BRACKET_",
  "{": "_LEFT_CURLY_BRACKET_",
  "}": "_RIGHT_CURLY_BRACKET_",
  "<": "_LESS_THAN__SIGN_",
  ">": "_GREATER_THAN__SIGN_",
  ",": "_COMMA_",
  ".": "_FULL_STOP_",
  ":": "_COLON_",
  ";": "_SEMICOLON_",
  "!": "_EXCLAMATION__MARK_",
  "?": "_QUESTION__MARK_",
  "&": "_AMPERSAND_",
  "|": "_VERTICAL__LINE_",
};

const encodeSigns = (string = "") => {
  if (typeof string !== "string") {
    return "";
  }

  const regex = /([^\w\s])/g; // Match non-word and non-space characters

  const newString = string.replace(regex, (match, sign) => {
    return db[sign] || match; // Replace with code if sign exists in db object
  });

  return newString;
};

const decodeSigns = (encodedString = "") => {
  if (typeof encodedString !== "string") {
    return "";
  }

  function escapeRegExp(str = "") {
    if (typeof str !== "string") {
      return "";
    }

    // Escape special characters in a string to be used in a regex pattern
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const regexPattern = new RegExp(
    `(${Object.values(db)
      .map((signCode) => escapeRegExp(signCode))
      .join("|")})`,
    "g"
  );

  // Replace every match with the original sign
  const replacedString = encodedString.replace(regexPattern, (match) => {
    return Object.keys(db).find((sign) => db[sign] === match) || match;
  });

  return replacedString;
};

console.log(encodeSigns("(1+2-2=3)")); // MINUS_2_EQUALS__SIGN_3_RIGHT_PARENTHESIS_
console.log(
  decodeSigns(
    "_LEFT_PARENTHESIS_1_PLUS_2_HYPHEN_MINUS_2_EQUALS__SIGN_3_RIGHT_PARENTHESIS_"
  )
); // (1+2-2=3)
