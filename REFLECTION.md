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

# Week 6 refelction

Q1. From clicking Place order to the order appearing on my Orders page

When I click Place order, the handleSubmit function in CheckoutForm.jsx runs validate on the form values. If there are no errors, it calls onPlaceOrder(values), which is handlePlaceOrder in CartPage.jsx. That function calls placeOrders(user, cart, details) from services/orders.js. This function groups the cart lines by vendor and uses writeBatch to create one order document per vendor, with status: 'Received' and serverTimestamp(). After batch.commit() succeeds, CartPage calls clearCart() and then navigate('/orders'). The Orders page uses the useMyOrders hook, which has an onSnapshot listener from subscribeToMyOrders that finds orders where studentUid equals my user id. When the new documents are saved, Firestore tells this listener by itself, and the hook updates the list. I never call setOrders after placing an order because the listener is the only source of truth. This way the page also updates when the status changes in the console or from another browser.

Q2. Why orders is a top-level collection, and why each order copies names and prices

Orders are a top-level collection because an order belongs to a student and to a vendor, not only to one shop. One query can then get all my orders with where('studentUid', '==', uid), even when they come from different shops. If orders were inside each vendor, I would need to search many places to build one list for the student. Each order also copies vendorName and each item’s name and price because an order is a record of what I bought at that time. If a shop later changes a price, renames an item or deletes it from the menu, my old order must still show the correct information. Firestore also has no joins, so storing only IDs would need extra reads to show a simple order. With copied values, the Orders page needs only one listener.

Q3. My personal feature: filter by category

The data is in vendors/{vendorId}/menu/{itemId} in the field category. The buttons are built from the field categories on the vendor document vendors/{vendorId}, which the seed function creates from the menu. The line that reads it is in services/vendors.js

const q = category ? query(menuRef, where('category', '==', category)) : menuRef

VendorPage reads ?cat= from the URL with useSearchParams and passes it to useVendor. The menu effect depends on category, so when I click a button, React stops the old listener and starts a new query. When I click All, the category is empty, so there is no where and every item shows. Because it uses onSnapshot, changing an item’s category in the Firestore console updates the page without a refresh.