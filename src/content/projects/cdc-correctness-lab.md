---
title: "CDC Correctness Lab"
summary: "An open, reproducible test harness that injects realistic faults into change data capture pipelines and reports what each tool loses, duplicates, reorders or corrupts."
status: "In progress"
stack: ["PostgreSQL", "Debezium", "Kafka", "Spark", "Delta Lake"]
links:
  - label: "Source on GitHub"
    url: "https://github.com/fatkhullakh/cdc-correctness-lab"
---

## The idea

Most comparisons of CDC tools measure speed. I want to measure correctness under failure, because that's where these pipelines hurt you in production: a connector restarts mid-transaction, a network link drops, a schema changes while data is flowing.

## What it will do

The harness runs a CDC pipeline from Postgres into lakehouse tables, injects faults on purpose, and then checks the target against the source. For each tool it reports what was lost, duplicated, reordered or corrupted.

## Tools I plan to compare

- My own Debezium, Kafka, Spark and Delta pipeline
- OLake
- Airbyte
- dlt (Postgres replication)
- PeerDB

## Status

In progress. The first milestone is two tools compared and the results published. I'll write it up in the Writing section when it's done.
