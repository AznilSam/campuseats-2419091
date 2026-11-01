# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- none

## Week 2
- Tool(s):
- none

## Week 3
- Tool(s):
- none

## Week 4
- Tool(s):
  - Claude 
- What I asked:
  - How to move the Week 3 fetch, loading and error logic into a custom hook (useVendors)
  - How to build useLocalStorage with try/catch so the cart survives a refresh
  - How to move the cart into a Context (CartProvider and useCart) and remove the cart props
  - How to set up React Router with a Layout and Outlet, a dynamic vendor/:id page, a cart page, an orders page and a 404 page
  - How to use useNavigate to go to /orders after checkout
  - How to build my personal feature (filter by category in the URL with useSearchParams)
- What I kept or changed:
  - Kept the hook, context and route structure from the lab sheet
  - Changed Header, VendorCard and MenuList to use NavLink, Link and useCart instead of props
  - Changed CartItem and CheckoutForm to match my own cart shape (a flat item with qty) and finished the TODOs myself
  - Added CSS for the links and the category filter chips
  - Tested direct URLs, refresh and the not found pages in the browser
- One thing the AI got wrong:
  - The AI first wrote CartProvider before it saw my CartItem and CartPage. My starter files used a different cart shape ({ item, qty }) and a different way of changing quantity (-1), so the first code did not fit. The AI then rewrote CartItem, CartPage and CheckoutForm to match.