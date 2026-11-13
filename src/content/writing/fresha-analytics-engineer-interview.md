---
title: "Fresha Analytics Engineer interview: a live SQL test on avatars"
description: "Fresha's live SQL round for the Analytics Engineer role: the exact tasks, my answers, and the correct ones."
date: 2026-11-14
tag: interviews
draft: false
company: "Fresha"
role: "Analytics Engineer"
outcome: "Rejected after the SQL test"
---

## At a glance

- **Vacancy:** Analytics Engineer
- **Company:** Fresha
- **Offered salary:** 17,000 PLN (B2B)
- **Period of recruitment:** May to June
- **Work format:** office (Warsaw, Poland)
- **Stack:** SQL, dbt, Snowflake
- **Stages:** Intro call (~30 min) → Technical interview: SQL test (45-60 min) → next stage (never reached)
- **Result:** rejected after the SQL test, same day

## About the company and the role

I'm pretty sure you've heard of Booksy. This one is kind of a similar app. I think there are two reasons why I caught their eye. First, I did an internship at EPAM as a "Data Analytics Engineer". Second, my thesis was literally an app like this, which I built myself. What a coincidence, hah.

The role was Analytics Engineer on the product side: dimensional models in dbt on Snowflake, clean data for decisions and for the product itself. The first line of the requirements was "Expert knowledge of SQL". Remember that.

## Intro call

I was training Claude Cowork to apply to jobs automatically without me, and guess what, it got me this interview. The Senior Engineer himself contacted me for an initial call, where we mainly discussed my previous experience, expectations, etc. It went pretty well, so I got invited to the next stage.

I'll be honest: he didn't really give me senior engineer vibes, because he was so casual and chill. Until then I imagined senior people as arrogant and very, very serious. So I didn't take him that seriously (I was so wrong).

## Technical interview

The Senior Engineer and another Analytics Engineer were on the call. This was one of the most impressive and unusual live coding tasks I've had so far. Most interviewers just give you a standard LeetCode problem, but I got 3 CSVs from their real tables and a real problem, wow. I think it's a really good approach: no memorized LeetCode problems, and a good test of whether a candidate can handle the kind of problems that actually come up at work. So, the tasks:

**The data:**

- **employees:** team members created by users of a B2B app for salon management. They can be real app users who can log in to the workspace (the first time they log in, their user_account_id is populated) or simpler entities controlled entirely by the workspace
- **employee_avatars:** table storing information about pictures used as avatars for employees by the workspace
- **user_account_avatars:** information about pictures that users themselves have chosen as their profile pics

### Task 1: What percent of employees have avatars with crop_height over 1000?

My first try:

```sql
WITH first_cte AS (
SELECT
    EMPLOYEE_ID,
    COUNT(*) AS total,
    COUNT(CASE WHEN CROP_HEIGHT > 1000 THEN 1 END) AS more_1000
FROM employee_avatars
GROUP BY EMPLOYEE_ID
)

SELECT
    EMPLOYEE_ID,
    ROUND(more_1000 * 100.0 / total, 1) AS percentage_difference
FROM first_cte
```

Wrong. I had two untested assumptions: one avatar per employee (true, we checked) and every employee has an avatar (false). The base has to be all employees, so LEFT JOIN. In their words: "We often learn about our tables from the tables."

**Correct answer:**

```sql
SELECT
    COUNT(DISTINCT CASE WHEN ea.crop_height > 1000 THEN e.id END) * 1.0
      / COUNT(DISTINCT e.id) AS pct
FROM employees e
LEFT JOIN employee_avatars ea ON ea.employee_id = e.id;
```

### Task 2: Provide the correct avatar for each employee

> An avatar-fetching service needs a query and expects a simple table of employee_id and avatar_id.
>
> - every employee should have exactly one row
> - avatar_id should be user_account_avatar ID (if present), employee_avatar_id or simply -1 (if no ID is present - to tell the app that the results are fetched correctly but didn't match anything)
> - report any problems you see with the task

**Correct answer:**

```sql
WITH latest_user_avatar AS (
    SELECT id, user_account_id
    FROM user_account_avatars
    QUALIFY ROW_NUMBER() OVER (PARTITION BY user_account_id ORDER BY created_at DESC) = 1
),
latest_employee_avatar AS (
    SELECT id, employee_id
    FROM employee_avatars
    QUALIFY ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY created_at DESC) = 1
)
SELECT
    e.id AS employee_id,
    COALESCE(ua.id, ea.id, -1) AS avatar_id
FROM employees e
LEFT JOIN latest_user_avatar ua ON ua.user_account_id = e.user_account_id
LEFT JOIN latest_employee_avatar ea ON ea.employee_id = e.id;
```

There was supposed to be a "pipeline planning" part, but we ran out of time. So sad, I was soo prepared for that part :(

## Result

Same day:

> As you probably already saw, the SQL test didn't go as we'd hoped and expert-level SQL is absolutely essential for our job. Sadly, this means that we will not progress you to the next stage of the recruitment.

Fair enough. SQL was the first line of the requirements, and on this test I didn't show it.

## What I took from it

- Validate your assumptions before you calculate anything.
- Drill ROW_NUMBER and COALESCE until your hands type them without you.
- If a senior is chill and casual, it doesn't mean you can take him less seriously.
