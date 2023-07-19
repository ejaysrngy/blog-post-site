const getFetcher = (args: any) =>
  fetch(args, { method: "GET" }).then((res) => res.json());

export { getFetcher };
