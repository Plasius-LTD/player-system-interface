# ADR-0004: Project Harmony Namespace Cutover

## Status

Accepted on 2026-07-15.

## Context

Project Harmony replaces the Isekai product namespace in one coordinated,
breaking release train. `@plasius/player-system-interface` exposes interface and
identity rollout keys through public constants, descriptors, default contracts,
and caller-supplied shell payloads. Compatibility branches would make the
renderer-independent contract boundary ambiguous.

The tracked implementation is
[Plasius-LTD/player-system-interface#28](https://github.com/Plasius-LTD/player-system-interface/issues/28),
under the Project Harmony namespace Feature and its remote rollout control
`harmony.namespace-cutover.enabled`.

## Decision

- Replace owned interface and identity `isekai.*` rollout values with their
  exact `harmony.*` equivalents.
- Update active package-family, runtime-NFR, and portability documentation to
  the Harmony namespace.
- Publish only Harmony values in constants, descriptors, defaults, examples,
  and test payloads.
- Do not add aliases, dual-read parsers, environment fallback, or runtime
  translation for the previous namespace.
- Release the change as the next major package version through the repository's
  approved `cd.yml` workflow.

## Rollout and rollback

The host feature-flag service is the source of truth for
`harmony.namespace-cutover.enabled`. Consumers update stored keys and package
majors during the coordinated maintenance window, then enable the flag for the
approved cohort.

Rollback requires disabling the cutover flag, restoring the coordinated
previous package majors, and applying the verified reverse stored-value
migration. This contract package has no persistent store of its own.

## Consequences

- Consumers receive one canonical Harmony namespace for System surfaces.
- Exported string-value changes are intentionally SemVer-major while TypeScript
  symbol names remain stable.
- Renderer and Player System consumers must adopt the new major only as part of
  the coordinated release train.
