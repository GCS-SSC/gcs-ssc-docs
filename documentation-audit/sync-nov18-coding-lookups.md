# November 18 accounting coding source review

Reviewed application `66c99235e8c3bf824a40efebef5a79d26ea936b3..9ad3ead3fc391576028906b55b634ebaf4a92ae2` (one commit, seven net changed paths).

The Commitment and Payment line editors use the shared CodingOptionLabel component for picker options and selected values. The lookup routes return ordered dimensions and localized multiline labels. Existing saved selections supply the same structured dimensions, and the component falls back to the option label when those dimensions cannot be parsed. Updated both Commitment and Payment guides and API contracts in both locales.

The tooling gitlink updates the coding architecture and associated lookup and lifecycle regression tests. Application tests were not executed.
