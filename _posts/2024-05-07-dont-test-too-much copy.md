---
layout: post
title: Don't test too much
date: 2024-05-08
excerpt:
tags: [coding, TDD, testing, business, code]
medium: https://medium.com/@mihura.ian/dont-test-too-much-90a3ecbea80f
language: en
---

Over-testing exists, let’s not delude ourselves, and it does not have to do with laziness or rookie-ness.

## Cost-benefit

Everything in engineering implies a cost-benefit balance. So tests also imply a cost we assume for a future benefit. The cost of time and energy invested in writing the test (and the time that will be invested in maintaining it), and the benefit of a faster development and debugging and better issue detection.

Right test coverage is a balance between time spent and value added, considering also the criticality of the feature being tested, and the chance that the test will catch a relevant bug.

## Features are assets, code is liability

So the old saying goes. As engineers we aim at producing value: if we want our tools to be used we make features, this is what the user cares and pays for, it’s the asset they buy.

On the other hand we write code that needs to be maintained, like an infrastructure that supports our features. Every line of code is like a liability, or future debt, that enables the features.

## Don’t let tests become liabilities

Tests are great, they help us automate feature verification (something we should otherwise have to do manually), they help us develop fast and confidently, and at times they document behavior.

But tests bring no new features to the user, thus they are kind-of liabilities.

Well, tests might not bring features to the user, but they can bring features to the developer. In this sense they are like a tool, and tools are assets. But they bring no new features to the user, and a one must keep this top-of-mind.

There’s no rule that says when tests become liabilities, other than “when they’re no longer useful”. This is a judgement that each programmer must make on the spot. But it is a valid judgement, and one we should be doing more.

## Tests are not like brakes on a car

*(So the metaphor goes: brakes on a car slow you down, but allow you to drive faster).*

This is a weird metaphor. Brakes are features of the car, for the user, tests are not. Brakes are not a compromise, we don’t go slower now to go faster later. Brakes exist to go slower and that’s all, there is no investment in the future, beside keeping yourself alive.

At most tests are a brake in your deployment pipeline, as they slow down, or stop, delivery. Though I wouldn’t say this metaphor works as it is usually meant (to encourage TDD).

## Bottom line: tests make you code quicker?

We have been taught, by what now seem like a Gang of Fanatics, that we should code everything, write our tests before we write our code (TDD) and aim at covering 100% of your code base. As if all code deserved to be tested!

They say that this will make us code quicker in the long run. Well, that is, if we write the correct tests.

Anyway, I think this argument misses the point. Testing the right amount is not about coding quicker, it’s about who’s paying for your code, what’s relevant for you to be doing, and how important it is that the code does not fail in said way. Great engineering considers cost and functionality first. We don’t have infinite time to re-write everything every time specs change, so be considerate with your company’s time.

P.S. if you ever feel compelled to fight someone else on how they structure their workflow, take a minute to touch some grass first.
