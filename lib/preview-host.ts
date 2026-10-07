export function codespacePreviewHost(): string | undefined {
  const name = process.env.CODESPACE_NAME;
  const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
  const label = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (
    process.env.CODESPACES !== "true" ||
    !name ||
    !domain ||
    !label.test(name) ||
    domain.split(".").length < 2 ||
    !domain.split(".").every((part) => label.test(part))
  )
    return undefined;
  return `${name}-3000.${domain}`;
}
