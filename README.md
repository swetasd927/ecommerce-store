# E-Commerce Store

A simple e-commerce storefront built with React, TypeScript, React Query, React Context, Tailwind CSS, and Ant Design using the FakeStoreAPI.

## Tech Stack

- React
- TypeScript
- React Router
- TanStack React Query
- React Context API
- Tailwind CSS
- Ant Design
- clsx
- tailwind-merge
- FakeStoreAPI

## Features

- Product listing
- Product details page
- Category filtering
- Pagination
- Infinite scroll
- Shopping cart
- Add, remove and update cart items
- Cart item count and total
- Dark/Light mode
- Responsive UI
- Skeleton loading states

### Bonus Features

- Search with debounce
- Sort by price/rating
- Toast notifications
- Cart persistence using localStorage

## Folder Structure

```
src/
├── api/
├── hooks/
├── context/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   └── cart/
├── pages/
├── lib/
├── types/
└── assets/
```

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate into the project.

```bash
cd ecommerce-store
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Build for production.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

## API

This project uses the Fake Store API.

https://fakestoreapi.com

## Git Workflow

- Create feature branches from `main`
- Use Pull Requests for merging
- Follow Conventional Commits

Examples:

```text
feat: add product listing
fix: update cart total calculation
refactor: extract reusable button
chore: configure tailwind
```

## Screenshots

_Add screenshots after completing the project._

## Future Improvements

- User authentication
- Wishlist
- Checkout page
- Product reviews
- Order history
- Better animations

## License

This project is created for learning purposes.