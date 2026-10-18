---
title: "airSlate · Data Engineer II (MLOps)"
description: "Every stage of airSlate's Data Engineer II (MLOps) process, with the exact questions I got in each round and how it went."
date: 2026-10-18
tag: interviews
draft: false
company: "airSlate"
role: "Data Engineer II (MLOps)"
outcome: "Rejected after the second technical interview"
---

## Short summary

- **Vacancy:** Data Engineer II (MLOps)
- **Company:** airSlate
- **Offered salary:** 17,000 PLN (B2B)
- **Period of recruitment:** June to July
- **Work format:** remote (Warsaw, Poland)
- **Stages:** Recruiter call → 1st technical interview → 2nd technical interview → Offer

## About the company and the role

A very interesting company. They build products for editing and signing documents (signNow, pdfFiller, I'm sure you have used these at some point in your life) and for automating business processes. They were looking for a Data Engineer with MLOps experience to support their whole marketing team.

## Recruiter call

The recruiter reached out to me through LinkedIn (an automated message saying they were impressed by my previous experience, haha). Nothing much. Just a standard recruiter call with standard questions: previous experience, expected salary, whether I'm allowed to work in Poland, etc.

## 1st technical interview (with a Staff ML Engineer)

Wow, what an interview. A great guy, very enjoyable to talk to. It lasted about one hour. It was casual and easygoing, not like some interviews where they interrogate you. Mainly focused on AI/ML theory, scenario-based questions, previous experience, etc.

Example questions:

- Have you worked with time-series data?
- How would you split the data for training?
- AI/ML theory (Dropout, Embeddings, K-Means, DBSCAN, etc.)
- How would you decide when to use a pretrained model vs training from scratch?
- Imagine a categorical feature, the name of a country (120 country names). How would you encode it for ML? (A great question to see whether a data engineer has experience preparing data for training models.)
- Imagine S3 storing a Parquet file with 1 million rows of keywords: short text (what users put into Google to search, so not full sentences, just a couple of words). How would you deduplicate them and detect whether the words are in English or non-English? Also, would your approach change if it scaled from 1 million to 100 million? What if 1 million rows came in every day?

It went really well in my opinion, because I got the result the next day, with an invitation to the next round.

## 2nd technical interview (with a Principal Data Engineer)

When I googled the guy who was going to interview me and found out that he is THE PRINCIPAL DATA ENGINEER (also a conference speaker and open-source contributor), my reaction was: 💀💀💀. Yeah, I was cooked. So: a 90-minute interview with 3 parts (Python, SQL and system design).

### Python (live coding)

Honestly, I was expecting a standard LeetCode-style problem, easy to medium level. Instead I received this:

> **Level 1: Basic file storage**
>
> Design an in-memory cloud file storage system that supports multiple users. Each user has their own isolated file space identified by a numeric user ID. Files are stored by name and have a size in bytes. Implement adding a file for a user (returning False if a file with that name already exists for that user), removing a file (returning False if not found), and retrieving all filenames for a user sorted alphabetically.
>
> **Level 2: Ownership and copy**
>
> Extend the system with file transfer and duplication capabilities. Implement changing ownership of a file from one user to another. This should fail if the file doesn't exist for the source user, or if the destination user already has a file with the same name. Also implement copying a file under a new name within the same user's space. This should fail if the source file doesn't exist or the new name is already taken. Both operations must be atomic: check all preconditions before mutating any state.
>
> **Level 3: Storage capacity**
>
> Add per-user storage quotas. Each user can be assigned a personal limit in bytes via a dedicated method. Once a limit is set, any operation that would cause the user's total stored bytes to exceed their limit must be rejected. This includes adding new files and copying existing ones. Removing a file must decrease the user's used capacity accordingly. Users without a limit set have unlimited storage. Implement a method to query how many bytes a user is currently using.
>
> **Level 4: Search and ranking**
>
> Add file discovery capabilities. Implement a search method that returns all filenames matching an optional prefix, an optional suffix, or both. Both conditions must match if both are provided, and results are sorted alphabetically. If no user ID is provided, search across all users in the system. Also implement a method to return the top N largest files for a given user as (filename, size) pairs sorted by size descending, again with support for searching across all users when no user ID is provided.

Yeah, I knew I was damn well cooked. I said directly that I was prepared for more LeetCode-style problems, that I didn't expect a problem like this, and that I didn't really know how to solve it. I was expecting him to just stop the interview so we wouldn't waste each other's time. BUT GUESS WHAT! The guy says something like: let's just start with level 1 and, step by step, try to understand it and implement the solution. Big respect to the guy for this. Eventually he ended up writing 70% of the code, with me trying to yap something in the middle.

### SQL (live coding)

I thought we would finish the interview after the Python humiliation. BUT NO! The guy kept going and we moved on to SQL. I think I performed slightly, just slightly, better than in Python. The problem:

> You are given an SQL table containing changes in prices of articles in a shop of following structure:
>
> `price_updates`
>
> | column | type |
> | --- | --- |
> | product | varchar |
> | date | date |
> | price | int |
>
> Write an SQL query which lists all articles whose price increased with every update.

You need to know SQL concepts like LAG, CTE, COALESCE, CASE WHEN, etc. This is the solution I provided:

```sql
WITH is_increased AS (
    SELECT product, price - coalesce(LAG(price) OVER (PARTITION BY product ORDER BY date), 0) as diff
    FROM price_updates
),

boolean AS (
    SELECT product,
        CASE
            WHEN diff > 0 THEN 1
            ELSE 0
        END AS boolean_diff
    FROM is_increased
)

SELECT product
FROM boolean
GROUP BY product
HAVING COUNT(*) = SUM(boolean_diff) and count(*) > 1
```

### System design

This was my first ever system design interview. I tried my best to prepare for it (mainly data engineering system design questions). However, I got something completely different. The problem:

> I'd like you to build a small service that executes an ML model in production and exposes it through an API. I want to see the pipelines for training the model and deploying it, and a diagram of how we would integrate this into our product.

I tried to yap my way around by drawing some bullshit diagrams :) but that didn't help, and I failed this part miserably.

## Advice from the interviewer

At the end of the interview I asked whether he could give me any advice for future interviews, my career, etc. He said something like: "Regarding the Python, I felt you were not that comfortable. In the future, if you have a problem with syntax, that's not a big deal. Generally, try to share your thoughts about how you see the solution. Then the interviewer will see that you are thinking the right way. Some trouble with syntax is no problem, we use a lot of AI these days, it's not a big deal. The main point is to understand the solution, and to show that it is optimal and on the right track."
