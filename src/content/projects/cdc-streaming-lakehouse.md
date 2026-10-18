---
title: "CDC Streaming Lakehouse"
summary: "An end-to-end streaming lakehouse: changes in a Postgres database are captured with Debezium, streamed through Azure Event Hubs and landed in Delta Lake tables."
status: "Built"
stack: ["PostgreSQL", "Debezium", "Azure Event Hubs", "Delta Lake", "dbt", "Unity Catalog"]
links:
  - label: "Source on GitHub"
    url: "https://github.com/fatkhullakh/cdc-streaming-lakehouse"
---

## What it does

Every insert, update and delete in a Postgres database is captured as it happens (change data capture), streamed through Azure Event Hubs, and written into Delta Lake tables. The result is a lakehouse that stays close to the source system without nightly batch loads.

## How it's built

- **Capture:** Debezium reads the Postgres write-ahead log and publishes the changes.
- **Transport:** Azure Event Hubs carries the change events.
- **Storage:** Delta Lake tables organized in a medallion architecture (bronze, silver, gold).
- **Transformations:** dbt models, tested in CI.
- **Governance:** Unity Catalog for access control and lineage.
- **Interoperability:** Delta UniForm, so Snowflake and Iceberg readers can query the same tables.

## About the data

The repository runs on synthetic generated data, so everything in it is public and reproducible.
