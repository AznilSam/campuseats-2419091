# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
In imperative code, I tell the browser step by step what to do, like finding an element and changing its text myself. In declarative React, I just describe what the UI should look like and React updates the page for me.

2. Why must a component name start with a capital letter?
React uses the capital letter to know it is a component and not a normal HTML tag. For example, <Header /> is treated as my component, but <header> is treated as plain HTML.

3. What does a fragment <>...</> do, and why not just use a <div>?
A fragment lets me return many elements together without adding an extra element to the page. A <div> would add a useless box in the HTML that can mess up the layout or styling.

4. Name one benefit of splitting the UI into small components.
Small components are easy to reuse. For example, I can use MenuItemCard for every food item instead of writing the same code again and again.