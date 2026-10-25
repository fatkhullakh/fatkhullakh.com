---
title: "Iver · Data Engineer"
description: "Every stage of Iver's Data Engineer process, with the questions I got in the technical interview, the feedback they sent me and how it ended."
date: 2026-10-25
tag: interviews
draft: false
company: "Iver"
role: "Data Engineer"
outcome: "Position closed by the company after the technical interview, with a detailed feedback"
---

## Short summary

- **Vacancy:** Data Engineer
- **Company:** Iver (Iver Polska)
- **Salary range (job posting):** 11,600 to 16,250 PLN (UoP, employment contract) | 14,000 to 19,500 PLN (B2B)
- **Period of recruitment:** August to September
- **Work format:** hybrid (3 days in the office, Gdańsk, Poland)
- **Stack:** ClickHouse, Cube.js, Apache Superset
- **Stages:** Intro call → Technical assessment (~90 min) → Final interview with the Group CIO (~45 min) → References and background check → Offer

## About the company and the role

Just a standard Scandinavian IT company, but the role is very interesting. They are moving away from Power BI and building an open-source analytics platform with a semantic layer (a single source of truth) on-premises, for internal use and for their customers. Imagine contributing to an open-source project while also getting paid for it. That was my dream.

## Intro call (with a manager)

I usually don't look up the person interviewing me before a recruiter call, because most of the time it's just standard questions (Tell me about yourself, Why are you leaving your current company, etc.). I expected the same this time, but I was soooo wrong. The guy, let's call him Agent K (nothing to do with MIB), has a technical background, and in the middle of the call he started bombarding me with technical questions I was not ready for (Docker containers, Compose, DevOps, etc.). I did my best to answer and somehow made it to the next stage.

After that call I cultivated a new habit: ALWAYS look up the person who will interview me and find out at least something about them, even if it's just a recruiter call.

## Technical assessment (with a data engineer from the team and Agent K)

I had to move this interview back by a week because I got sick. I spent that week learning more about the stack, especially ClickHouse (I went really deep to see how it works under the hood). I'm kind of glad and regretful at the same time. Why regret? Because they didn't ask a single question about ClickHouse :( not a single one. Why glad? Because, looking back, I don't think I would ever get a better chance to dive that deep into it. It's a very interesting, fast columnar database (originally built at Yandex), and I recommend reading about it.

The questions were mainly about:

### My projects and experience

- Which project is the most important to you, and why?
- Which part of the job do you enjoy the least?
- Walk me through the most difficult implementation

### SQL

- ROW_NUMBER vs RANK vs DENSE_RANK
- What is the difference between UNION and UNION ALL?
- What is the difference between partitioning and clustering?
- Have you used CROSS JOIN?
- How would you handle NULLs in SQL and in modeling?

### Python and Spark

- What are the differences between a list, a set, a tuple and a dictionary?
- Is an empty list as a default function argument a good idea?
- How do you work with timestamps and time zones?
- What is the difference between a driver and an executor?
- What was your hardest Spark debugging?

### Airflow and Power BI

- What is an idempotent DAG and how do you achieve it?
- How would you calculate unique users per day, per week and per month?

### Documentation and Docker

- What documentation do you write, and where?
- Docker vs Docker Compose, and why do companies use Docker?

### Data modeling and stakeholders

- What is your data modeling experience?
- How do you handle stakeholders when a small change on their side means a huge change in the data?
- Have you taught stakeholders how to build dashboards or choose metrics?

## Feedback and result

After about a week I wrote to ask for an update and got this feedback:

> **Way of working:** Wants to move from projects to a product-based environment; well-prepared, natural and more introverted, but listens actively and draws the right conclusions.
>
> **Analytics:** Medallion architecture, Data Lakes, Databricks, dbt; good understanding of CDC; Power BI knowledge a bit rusty.
>
> **DevOps / Cloud:** No Docker experience; sporadic experience with Airflow, but seems able to catch up quickly.
>
> **Database:** Solid data engineering background; good grasp of SQL and Python; correctly answered questions on unique users and window functions.
>
> **Comment:** Very sharp candidate with relevant hands-on Data Engineering experience. Most answers were logical and well-structured; technically a good fit.

I didn't make it to the Group CIO stage because, according to the feedback, they closed the recruitment process for this position. The interesting part is that I remember seeing this position back in April this year, and they only took it down last month. So they were searching for about six months. Damn, I hope they found a good match.
