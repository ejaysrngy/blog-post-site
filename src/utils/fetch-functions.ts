const getFetcher = (args: any) =>
  fetch(args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export { getFetcher };
