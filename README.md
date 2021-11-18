[![CI](https://github.com/navikt/dependabot-whitelist/actions/workflows/ci.yml/badge.svg)](https://github.com/navikt/dependabot-whitelist/actions/workflows/ci.yml)
![RELEASE](https://img.shields.io/github/v/release/navikt/dependabot-whitelist?display_name=tag&sort=semver)

<p align="center">
    <img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibmF2XC9hY2NvdW50c1wvZmNcLzQwMDA3NDBcL3Byb2plY3RzXC8yXC9hc3NldHNcLzlmXC8zMTI2XC8wZTIxMTMxZjM0YjU5ZTQxYzI4ODY5ZGM1ZGRhZjg0Yy0xNjI1MDYzOTA3LnBuZyJ9:nav:WCh-t5l7yrSujHTScCKngPJv29mCgnFO42hD21WiO7s?width=150" alt="NAV Logo" height="150"/>
</p>

# Dependabot Whitelist Action

**Name:** `navikt/dependabot-whitelist`

Checks if a dependency update from a Dependabot-generated PR is whitelisted. This is useful when we want
to enable auto-merging trusted dependencies. Unlike whitelisting in Dependabots `allow` [configuration](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates#allow),
this action will preserve the pull-request, making it a notice and available for manual review.

## Usage Instruction
Create a workflow for e.g. `pull_request_target`

```yaml
name: Dependabot Pull Request
on: pull_request_target
jobs:
  check-whitelist:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - uses: navikt/dependabot-whitelist@v1
        with:
          whitelist: |
            io.ktor:ktor-server-netty
            jvm
            org.jetbrains.kotlinx:kotlinx-coroutines-jdk8
```

This action will fail with `exit code 1` on any violation.

## Configuration
No dependencies are whitelisted by default.

Major versions often comes with breaking changes or additional required actions, that makes it applicable for human review like going through the changelog or waiting for zero days threats etc.

|Option|Required|Default Value|Description|
|:-----|:-------|:------------|:----------|
|`whitelist`|`yes`|''|A multi-line string of packages|
|`major`|`no`|`false`|Whitelist major versions|
|`minor`|`no`|`true`|Whitelist minor versions|
|`patch`|`no`|`true`|Whitelist patch versions|
|`token`|`no`|`${{ github.token }}`|An alternative to the default GitHub Token|
