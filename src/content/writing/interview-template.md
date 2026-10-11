---
title: "Company, Data Engineer: what the interview looked like"
description: "One sentence on the most useful thing a reader learns from this post."
date: 2026-10-11
tag: interviews
draft: true
company: "Company name"
role: "Data Engineer"
outcome: "Rejected after the technical round"
---

This is a template. It only shows up when you run the site locally, never on the live site. Copy this file, rename it, fill it in, and set `draft: false` when the process is finished.

## The process

How you applied, how many stages, how long it took from first contact to the final answer.

## Stage 1: recruiter call

What they asked, what they cared about, anything about salary or contract type that's useful to know.

## Stage 2: technical round

Describe the type of problem and what it was really testing. Don't paste the exact prompt.

For example: a live SQL task where you had to pick the latest record per customer from a table with duplicates. My first attempt used `GROUP BY` with `MAX`, which loses the other columns. What they wanted:

```sql
select *
from (
  select
    *,
    row_number() over (partition by customer_id order by updated_at desc) as rn
  from orders
) t
where rn = 1;
```

## Where I struggled

Be honest here. This is the part people actually read.

## What I'd prepare differently

Three to five concrete things.
