export default function unescape(string) {
  const characters = [
    ["&lt;", "<"],
    ["&gt;", ">"],
    ["&amp;", "&"],
    ["&#x27;", "'"],
    ["&quot;", '"'],
    ["&#x2F;", "/"],
    ["&#96;", "`"],
  ];

  return characters.reduce(
    (acc, [key, value]) => acc.replaceAll(key, value),
    string,
  );
}
