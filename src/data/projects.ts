// Your projects. Order here is the order on the site.
// `url` is optional: leave it empty if there's nothing public to link to.

export const projects = [
  {
    name: "CDC correctness lab",
    kind: "Open source",
    summary:
      "A fault-injection harness that checks whether a Postgres to lakehouse CDC pipeline keeps data correct when things break.",
    url: "https://github.com/fatkhullakh",
    stack: ["Debezium", "Postgres", "Delta Lake", "PySpark"],
  },
  {
    name: "Saqla",
    kind: "Product, co-founded",
    summary:
      "A food rescue marketplace connecting shops with leftover food to people who buy it at a discount.",
    url: "",
    stack: ["AWS", "Payme", "Click"],
  },
  {
    name: "NavbatUz",
    kind: "Product, co-founded",
    summary: "A booking platform for local services in Uzbekistan.",
    url: "",
    stack: [],
  },
];
